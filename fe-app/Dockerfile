FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN export NODE_OPTIONS=--openssl-legacy-provider && npm run build --production --ignore-scripts --prefer-offline
EXPOSE 3001
CMD ["npm", "run", "start:prod"]