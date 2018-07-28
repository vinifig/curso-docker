FROM node:alpine

MAINTAINER Vinicius Figueiredo Rodrigues

EXPOSE 8080 8080

WORKDIR /app

COPY package.json /app/package.json
COPY index.js /app/index.js

RUN npm install

CMD node index.js