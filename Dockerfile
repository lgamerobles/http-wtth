FROM node:14.15.1

WORKDIR /

ADD package.json package.json

RUN npm install

ADD . /

EXPOSE 3000

CMD ["npm", "run", "start"]
