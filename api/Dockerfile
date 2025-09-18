# https://hub.docker.com/_/node/#image-variants
FROM node:20-alpine AS base

WORKDIR /usr/src/app

# Install deps first (better layer caching)
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund
# RUN npm i

# Copy source
COPY . .
# Leave node_modules to host OS
# https://stackoverflow.com/questions/51097652/install-node-modules-inside-docker-container-and-synchronize-them-with-host

# Expose the app port
EXPOSE 8081

# Default to dev mode with live reload
# Switch to "start" for production - Check package.json scripts
CMD ["npm", "run", "dev"]
