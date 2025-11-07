# Use the official Node.js LTS image
FROM node:18

# Create and set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Expose the app port
EXPOSE 8000

# Command to run the app
CMD ["node", "src/index.js"]
