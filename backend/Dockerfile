FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install express dotenv mysql2 cors
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
