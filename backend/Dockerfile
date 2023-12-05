FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && \
    apt-get install -y openjdk-17-jdk

RUN apt-get install time

RUN npm install

COPY . .

RUN npm run build

RUN mkdir -p /tmp/sandbox
RUN gcc src/java-runner/run.c -Wall -o /tmp/sandbox/run

CMD [ "node", "dist/main.js" ]