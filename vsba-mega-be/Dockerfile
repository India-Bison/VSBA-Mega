# Use the official Bun image
FROM node:latest

# Create and switch to the /app directory
WORKDIR /

# Copy package manifests first (to leverage Docker layer caching)
COPY package.json bun.lockb ./

# Install dependencies
RUN npm i -g install bun
RUN bun install

# Copy over the rest of your code
COPY . .

# Expose the port your Bun app listens on
EXPOSE 3000

# Use "bun start" so it runs the "start" script from package.json
CMD ["bun", "start"]
