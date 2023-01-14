FROM node:14.21.2

RUN curl https://install.meteor.com/ | sh

WORKDIR /app

RUN echo "meteor npm install" | ls -la | pwd

RUN meteor npm install

RUN echo "npm run build" | ls -la | pwd

RUN npm run build

RUN echo "copy dist/bundle /app" | ls -la | pwd

COPY dist/bundle /app

CMD ["node", "main.js"]