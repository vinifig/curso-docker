# Docker - Primeiros Passos

Antes de colocar a mão na massa recomendo uma leitura sobre o que são contêineres e porque utilizá-los. Esta [apresentação](https://www.slideshare.net/KarlIsenberg/container-orchestration-wars), da [Mesosphere](https://mesosphere.com/) feita por [Karl Isenberg](https://www.linkedin.com/in/karlisenberg), passa um overview de contêineres e microserviços.

Este tutorial irá demonstrar o resultado final de cada etapa em uma `Branch` onde poderá verificar o status do projeto.

## Requisitos

Se chegou neste ponto, você irá precisar de :

 - Um computador ou máquina virtual com suporte à `Docker`;
 - Um editor de código em seu ambiente para implementação do passo à passo desta introdução.


## 1. Instalação

Caso ainda não tenha o `Docker` disponível, em seu ambiente, siga o [tutorial](https://docs.docker.com/install/) de instalação, escolha a versão que melhor se adeque a você.

## 2. "Hello, World!"

Com seu ambiente preparado, podemos começar com uma pequena aplicação [Node.JS](https://nodejs.org/).

Você pode iniciar um projeto do zero ou clonar este projeto e começar utilizando a branch: `step1-hello-world-base`

### Criando um projeto do zero:

Para iniciar um projeto do zero, abra seu terminal na pasta de projeto desejada e rode os comandos abaixo:

``` bash
$ npm init -y
$ npm install --save express
```

### Clonando o projeto:

Para iniciar a partir de nosso projeto base:

``` bash
$ git clone https://github.com/vinifig/curso-docker
$ cd curso-docker
$ npm install
```

### Fazendo uma aplicação de servidor com `NodeJS`


Com o projeto criado e as dependências instaladas, crie um arquivo `index.js` e insira o código abaixo:


```js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello, World!'
    });
});

app.listen(PORT, () => {
    console.log(`App started in port ${PORT}`);
});
```
Este código inicia um servidor HTTP. Se desejar, pode verificar o funcionamento executando:

``` sh
node index.js
```

E abrindo o navegador em `http://localhost:<PORT>`, onde a porta é o valor exibido no console após a inicialização.

### Criando uma imagem para a aplicação:

Todo container `Docker` é feito baseado em uma imagem prévia. Para este projeto utilizaremos a imagem `node:alpine`. 
As imagens baseadas em `alpine` são extremamente enxutas, algumas razões para utilizá-las podem ser encontradas neste [artigo](https://nickjanetakis.com/blog/the-3-biggest-wins-when-using-alpine-as-a-base-docker-image).


Para criar a imagem, crie um arquivo `Dockerfile` com o conteúdo abaixo:

```
FROM node:alpine

MAINTAINER <seu nome>

EXPOSE 8080 8080

WORKDIR /app

COPY package.json /app/package.json
COPY index.js /app/index.js

RUN npm install

CMD node index.js

```

O projeto, até este ponto, pode ser encontrado na branch `step1-hello-world-source`

Após isso rode o seguinte comando na pasta de seu projeto: 

`docker build -t helloworld-node:1.0 .`

Este comando iniciará uma imagem baseada em `node:alpine` com o código fonte da sua aplicação. Conforme descrito no Dockerfile. 

Para mais detalhes sobre o arquivo dockerfile, consulte a [documentação](https://docs.docker.com/engine/reference/builder/).

Após rodar este comando, o docker criará uma imagem que pode ser utilizada para iniciar um `Docker Container` rodando a aplicação, utilizando o comando abaixo:

`docker run -p 8080:8080 helloworld-node:1.0`

Para verificar o funcionamento basta acessar seu navegador da mesma maneira, `http://localhost:<port>`, sendo port por default: `8080`.