FROM node:14-alpine3.14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]