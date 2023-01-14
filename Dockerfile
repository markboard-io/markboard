FROM node:14.21.2

RUN curl https://install.meteor.com/ | sh

WORKDIR /app

COPY . .

ENV METEOR_ALLOW_SUPERUSER=1

RUN meteor npm install

RUN npm run build

WORKDIR /app/dist/bundle

CMD ["node", "main.js"]