FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/ src/

ENV USER_SERVICE_URL=http://user-svc:5000/users
ENV ORDER_SERVICE_URL=http://order-svc:5001/orders

CMD ["node", "src/app.js"]
