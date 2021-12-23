FROM node:14-alpine3.14 as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build --prod

FROM nginx:stable-alpine
EXPOSE 80
COPY --from=build /usr/src/app/dist/members-club-client /usr/share/nginx/html