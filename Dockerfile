FROM node:slim

# Create app directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Start the application
CMD ["yarn", "start"]
