FROM node:18-alpine
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod --force
COPY . /app
EXPOSE 3001
CMD ["node", "server"]