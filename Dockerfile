FROM node:10.15.0-alpine
WORKDIR /usr/src/app
RUN apk update && apk add git openssh
COPY package*.json ./
COPY .ssh /root/.ssh
RUN npm install
COPY . .
RUN rm -rf .ssh /root/.ssh

EXPOSE 10004
CMD [ "npm", "start" ]