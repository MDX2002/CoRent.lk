# Use the official Node.js image as a base
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Define the command to run your app
CMD ["npm", "run", "dev"]