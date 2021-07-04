const http = require('http')
const { readFileSync, createReadStream } = require('fs')
/*
Objetivo: ler arquivos sob demanda

Criando arquivo de texto com aproximados 1GB pra teste
Comando: node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
*/

http.createServer((req, res) => {
    //Jeito normal de ler arquivos com FS
    // const file = readFileSync('big.file')
    // res.write(file)
    // res.end()

    //Jeito melhor pra ler arquivos grandes sob demanda
    createReadStream('big.file').pipe(res)

    //curl http://localhost:3000 --output output.txt vai baixar o arquivo big.file quebrando em partes

}).listen(3000, () => console.log('Escutando na porta http://localhost:3000/'))