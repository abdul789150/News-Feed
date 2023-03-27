# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json .
COPY .env .
RUN npm install

# Add the rest of the application
COPY . .

# Build the app for production
RUN npm run build

# Build the Storybook

# Expose ports
EXPOSE 3000
EXPOSE 6006

# CMD ["npm", "run", "start:$NODE_ENV"]
CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run start-dev; else npm run start-prod; fi" ]