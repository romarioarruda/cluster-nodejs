const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

const fibonacci = (n) => {
    return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2)
}

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 1; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    const result = fibonacci(43)
    res.end(`Resultado calculo: ${result}`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started, CPUS: ${numCPUs}`);
}