FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3002

CMD ["npm", "start"]
