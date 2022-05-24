import http from 'http'
import { Readable } from 'stream'
import { randomUUID } from 'crypto'


function* run() {
  for(let index = 0; index <= 99; index++) {
    const data = {
      id: randomUUID(),
      name: `romario-${index}`
    }

    yield data
  }
}


function handler(_req, resp) {
  const readable = new Readable({
    read() {
      for(const data of run()) {
        this.push(JSON.stringify(data))
      }

      //Pra informar que os dados acabaram
      this.push(null)
    }
  })

  readable.pipe(resp)
}


http.createServer(handler)
  .listen(3000)
  .on('listening', () => console.log('Escutando na porta 3000'))