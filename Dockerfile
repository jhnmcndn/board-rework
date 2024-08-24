FROM node:18-alpine AS builder

ENV NODE_OPTIONS="--max_old_space_size=4096"

WORKDIR /build

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

ARG ENVIRONMENT

RUN npm run build-${ENVIRONMENT}

FROM alpine:latest

RUN apk add --no-cache nodejs npm && npm install -g serve

WORKDIR /build

EXPOSE 3000

CMD ["serve", "-s", "build"]
