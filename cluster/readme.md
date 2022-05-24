### Testando cluster do Nodejs para escalar aplicação

##

**Requerimentos**:

- Tenha o Node(v14.17.6 ou superior) instalado
- Tenha o autocannon instalado (npm i -g autocannon)

##


**Subindo o servidor de aplicação**

```
$ node index.js
```

`Server escutando em: http://localhost:8000`

##

**Testando poder de execução da aplicação**

```
$ autocannon -c 500 -d 30 --workers 10 --renderStatusCodes --latency http://localhost:8000
```

Parâmetros do comando autocannon

```
-c indica o número de conexões simultâneas (500)
-d indica o tempo que dura a execução em segundos (30)
--workers indica o número de processos que o S.O vai subir para executar a aplicação (10 processos)
--renderStatusCodes indica que queremos saber sobre status de resposta da aplicação
--latency indica que queremos saber sobre tempo de execução por segundos
```

##

**Links úteis**
- https://nodejs.org/api/cluster.html#cluster_cluster
- https://nodejs.org/api/process.html#process