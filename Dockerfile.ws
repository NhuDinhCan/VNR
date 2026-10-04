FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY ws-server.js ./
COPY src/lib/roomFourSpatial.json ./src/lib/roomFourSpatial.json
EXPOSE 3001
CMD ["node", "ws-server.js"]
