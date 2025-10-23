# Stage 1: Build the Angular application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps flag
RUN npm ci --legacy-peer-deps

# Copy the entire workspace
COPY . .

# Build the application for production
RUN npx nx build ledger-portal --configuration=production

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Copy the nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built application from the builder stage
COPY --from=builder /app/dist/apps/ledger-portal /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
