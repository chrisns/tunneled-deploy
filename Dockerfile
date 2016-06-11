FROM node:4.2.2
RUN echo "deb http://http.debian.net/debian wheezy-backports main" > /etc/apt/sources.list.d/backports.list
RUN apt-get update
RUN apt-get install -y apt-transport-https ca-certificates

RUN echo "deb https://apt.dockerproject.org/repo debian-jessie main" > /etc/apt/sources.list.d/docker.list
RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
RUN apt-get update
RUN apt-get install -y docker-engine

COPY package.json package.json
RUN npm install
COPY . .

