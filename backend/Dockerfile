# Use the official Node.js v18 image as the base
FROM node:18

ARG NEXT_PUBLIC_WEB3MODAL_PROJECT_ID
ARG NEXT_PUBLIC_GIPHY_API_KEY

ENV NEXT_PUBLIC_WEB3MODAL_PROJECT_ID=$NEXT_PUBLIC_WEB3MODAL_PROJECT_ID
ENV NEXT_PUBLIC_GIPHY_API_KEY=$NEXT_PUBLIC_GIPHY_API_KEY

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