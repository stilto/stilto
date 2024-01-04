# Use the official Node.js v18 image as the base
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the app to the container
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port 5001 for the app
EXPOSE 5001

# Start the app
CMD ["npm", "start"]