
# Use Node.js LTS
FROM node:22

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json first (better for caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 6000

# Run the service (no nodemon in container)
#CMD ["npm", "start"]
CMD ["node", "src/server.js"]
