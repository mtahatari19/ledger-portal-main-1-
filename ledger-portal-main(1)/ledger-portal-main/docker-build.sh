#!/bin/bash

# Build script for Tata Back Office Docker image

echo "🚀 Building Tata Back Office Docker image..."

# Build the Docker image
docker build -t tata-back-office:latest .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    echo "📦 Image: tata-back-office:latest"
    
    # Display image size
    docker images tata-back-office:latest --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
else
    echo "❌ Docker build failed!"
    exit 1
fi
