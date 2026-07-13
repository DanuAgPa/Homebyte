FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps && npm cache clean --force

COPY . .

RUN npx prisma generate
RUN npm run build

ENV HOSTNAME="0.0.0.0"
EXPOSE 3001

CMD ["npm", "start"]
