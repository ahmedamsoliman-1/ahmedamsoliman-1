FROM node:16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --production --silent

COPY . .

EXPOSE 3009

CMD ["node", "app.js"]
