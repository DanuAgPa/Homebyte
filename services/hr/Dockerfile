FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npx prisma generate

EXPOSE 3002

CMD ["npm", "start"]
