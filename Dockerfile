FROM node:6-alpine

RUN apk update && \
  apk add docker

COPY package.json package.json
RUN npm install
COPY . .

CMD npm start