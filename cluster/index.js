const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length * 2;
const fibonacci = require('./fibonacci')

function runMasterProcess() {
  console.log(`Master ${process.pid} is running with ${numCPUs} processes`);
  // creating processes according my cpu number
  for (let i = 1; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    if(code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`worker ${worker.process.pid} died, scheduling new one!`);
      cluster.fork();
    }
  });
}


function runWorkerProcess() {
  http.createServer((_req, res) => {
    res.writeHead(200);
    const result = fibonacci(20)
    res.end(`Resultado calculo: ${result}`);
  }).listen(8000)

  console.log(`Worker ${process.pid} started`);
}


cluster.isMaster ? runMasterProcess() : runWorkerProcess()