FROM node:lts-alpine

RUN apk --no-cache add git

CMD ["sh", "-c", "npm install && npm start"]