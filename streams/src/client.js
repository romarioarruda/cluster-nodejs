import axios from 'axios'
import { Transform, Writable } from 'stream'
import { createWriteStream } from 'fs'

const url = 'http://localhost:3000'

async function consume() {
  const response = await axios({
    url,
    method: 'get',
    responseType: 'stream'
  })

  return response.data
}


const stream = await consume()

stream
  .pipe(
    new Transform({
      objectMode: true, //Trocando padrão de buffer para strings
      transform(chunk, _encode, cb) {
        const item = JSON.parse(chunk)
        const number = /\d+/.exec(item.name)[0]
        let name = item.name

        if (number % 2 === 0) name = name.concat(' é par')
        else name = name.concat(' é impar')

        item.name = name

        cb(null, JSON.stringify(item) + ',\n')
      }
    })
  )
  .pipe(createWriteStream('./src/result.txt', { flags: 'a' }))

  
  // .pipe(
  //   new Writable({
  //     objectMode: true, //Trocando padrão de buffer para strings
  //     write(chunk, _encode, cb) {
  //       createWriteStream('./src/result.txt', { flags: 'a' }).write(chunk + "\n")
  //       return cb()
  //     }
  //   })
  // )