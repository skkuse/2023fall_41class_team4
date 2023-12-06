FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && \
    apt-get install -y openjdk-17-jdk

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

RUN sh setup.sh

CMD [ "node", "dist/main.js" ]