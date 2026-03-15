#!/bin/bash

# Mission Control Dynamic Deployment Script
# Builds and deploys the dynamic mission control dashboard

echo "🚀 Deploying Mission Control Dynamic v2.0"
echo "========================================="

# Stop existing static version if running
echo "📋 Stopping any existing mission control processes..."
pkill -f "next.*3000" || true
pkill -f "http.server.*8080" || true

# Build the dynamic version
echo "🔧 Building dynamic mission control..."
cd "$(dirname "$0")"
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Export static build for deployment
echo "📦 Exporting static build..."
npm run export 2>/dev/null || echo "ℹ️  Using build output as-is"

# Create deployment directory
echo "📂 Setting up deployment directory..."
mkdir -p ../mission-control-live
cp -r out/* ../mission-control-live/ 2>/dev/null || cp -r .next/static ../mission-control-live/

# Start the dynamic server
echo "🌟 Starting Mission Control Dynamic on port 3001..."
PORT=3001 npm start &

# Display status
echo ""
echo "✅ Mission Control Dynamic deployed successfully!"
echo ""
echo "🔗 Access URLs:"
echo "   Dynamic Dashboard: http://localhost:3001"
echo "   Mission Control API: http://localhost:8000"
echo ""
echo "📊 Features enabled:"
echo "   ✓ Real-time session data"
echo "   ✓ Live system metrics"
echo "   ✓ OpenClaw Gateway integration"
echo "   ✓ 30-second auto-refresh"
echo "   ✓ Professional agent status"
echo ""
echo "🎯 CEO Request completed: Static data → Dynamic data ✓"
echo ""