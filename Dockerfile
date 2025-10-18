FROM node:22-alpine3.18

WORKDIR /usr/src/app

COPY src/* ./

RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]