FROM node:17-alpine3.12
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install npm@8.3.0
RUN npm install  -g add-cors-to-couchdb
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
