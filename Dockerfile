FROM node:18

WORKDIR /usr/src/space-api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
