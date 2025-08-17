# Use Node.js LTS version
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the port (from .env → 5000)
EXPOSE 5000

# Start the service
CMD ["node", "src/server.js"]
