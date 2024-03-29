FROM node:18-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN node ./node_modules/puppeteer/install.js

EXPOSE 3333

CMD [ "node", "dist/index.js" ]