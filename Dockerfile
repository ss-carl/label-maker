FROM node:8.10.0

ENV NODE_ENV=production
RUN mkdir /app
COPY package-lock.json package.json /app/
WORKDIR /app
RUN npm install
COPY . .
CMD ["node", "index.js"]
