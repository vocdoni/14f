# Static web site compiler
FROM node:14 as builder

ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}
ARG ETH_NETWORK_ID
ENV ETH_NETWORK_ID=${ETH_NETWORK_ID}
ARG ETH_CHAIN_ID
ENV ETH_CHAIN_ID=${ETH_CHAIN_ID}
ARG BLOCK_TIME
ENV BLOCK_TIME=${BLOCK_TIME}
ARG BOOTNODES_URL="https://bootnodes.vocdoni.net/gateways.stg.json"
ENV BOOTNODES_URL=${BOOTNODES_URL}

ADD . /app
WORKDIR /app
RUN npm install --force && npm run export


## Static web server
FROM nginx:1.19

COPY --from=builder /app/build /usr/share/nginx/html
