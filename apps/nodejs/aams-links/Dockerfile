FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copy .env file to the container
COPY .env .env

CMD ["node", "src/app.js"]
