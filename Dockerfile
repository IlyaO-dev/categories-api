FROM node:18-alpine
RUN apk update

WORKDIR /app
COPY . .

RUN yarn --frozen-lockfile
RUN yarn build
RUN ls
CMD ["node", "dist/main.js"]