#!/bin/bash

# Deployment script for Tata Back Office

echo "🚀 Deploying Tata Back Office..."

# Stop and remove existing container if it exists
echo "🔄 Stopping existing containers..."
docker-compose down

# Build and start the services
echo "🏗️  Building and starting services..."
docker-compose up -d --build

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Application is running at: http://localhost:8080"
    echo ""
    echo "📊 Container status:"
    docker-compose ps
    echo ""
    echo "📝 View logs with: docker-compose logs -f"
    echo "🛑 Stop with: docker-compose down"
else
    echo "❌ Deployment failed!"
    exit 1
fi
