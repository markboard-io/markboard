FROM node:14.21.2

RUN curl https://install.meteor.com/ | sh

WORKDIR /app

RUN meteor npm install

RUN npm run build

COPY dist/bundle /app

CMD ["node", "main.js"]