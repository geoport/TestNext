# Stage 1: Build environment
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN apk add --update python3 make g++ gcc fftw-dev libc6-compat
RUN apk add --update --repository http://dl-3.alpinelinux.org/alpine/edge/testing vips-dev
RUN npm install
RUN npm i sharp
# Copy the entire project to the working directory
COPY . .

# Build the Next.js application for production
RUN npm run build

# Stage 2: Production environment
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY .env.local .
# Set the environment variable to run the Next.js application in production mode
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_SHARP_PATH /tmp/node_modules/sharp

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
