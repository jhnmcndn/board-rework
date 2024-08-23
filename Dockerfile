FROM node:18-alpine AS builder

WORKDIR /build

COPY package*.json ./

RUN bun install

COPY . .

ARG ENVIRONMENT

RUN bun run build-${ENVIRONMENT}

FROM alpine:latest

RUN apk add --no-cache nodejs npm && npm install -g serve

WORKDIR /build

COPY --from=builder /build/build /build/build

EXPOSE 3000

CMD ["serve", "-s", "build"]
