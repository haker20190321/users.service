FROM node:11.5.0-alpine
WORKDIR /usr/src/app
RUN apk update && apk add git openssh
COPY package*.json ./
COPY .ssh /root/.ssh
RUN npm install
COPY . .
RUN rm -rf .ssh /root/.ssh

EXPOSE 8085
CMD [ "npm", "start" ]