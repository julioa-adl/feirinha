FROM node:16.14

WORKDIR /app

COPY package*.json ./

USER root

RUN ["npm", "i", "--silent"] 

RUN ["npm", "i", "-g", "ts-node"] 

COPY . .

RUN chown node:node /app

USER node

ENTRYPOINT ["npm", "run", "dev"]