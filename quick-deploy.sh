#!/bin/bash
# Quick Mission Control Deployment Script
# Date: March 15, 2026
# Usage: ./quick-deploy.sh [port]

PORT=${1:-3000}

echo "🚀 Mission Control Dashboard - Quick Deploy"
echo "=================================="
echo "Port: $PORT"
echo "Host: 0.0.0.0 (external access enabled)"
echo ""

# Kill any existing processes on the port
echo "🔧 Cleaning up existing processes..."
pkill -f "next dev" || true
lsof -ti:$PORT | xargs kill -9 2>/dev/null || true

# Wait a moment for cleanup
sleep 2

# Start the development server
echo "🚀 Starting Mission Control Dashboard..."
npm run dev -- --hostname 0.0.0.0 --port $PORT

echo ""
echo "✅ Mission Control Dashboard should be running at:"
echo "   Local:    http://localhost:$PORT"
echo "   External: http://87.106.65.146:$PORT"
echo ""
echo "📊 Available routes:"
echo "   Dashboard:    /"
echo "   Agents:       /agents/"
echo "   Org Chart:    /chart/"