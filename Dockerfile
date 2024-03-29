FROM node

WORKDIR /usr/app

COPY package.json /usr/app/

RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]
