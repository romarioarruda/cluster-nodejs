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
      transform(chunk, encode, cb) {
        const item = JSON.parse(chunk)
        const number = /\d+/.exec(item.name)[0]
        let name = item.name

        if (number % 2 === 0) name = name.concat(' é par')
        else name = name.concat(' é impar')

        item.name = name

        cb(null, JSON.stringify(item))
      }
    })
  )
  .pipe(
    new Writable({
      write(chunk, encode, cb) {
        const data = chunk.toString()
        createWriteStream('./src/result.txt', { flags: 'a' }).write(data + "\n")
        cb()
      }
    })
  )