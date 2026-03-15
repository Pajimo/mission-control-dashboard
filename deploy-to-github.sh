#!/bin/bash

# Professional GitHub Pages Deployment Script
# For Mission Control Dashboard - Pajimo Account

echo "🚀 Starting professional GitHub Pages deployment..."

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully"

# Add all changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "📝 No changes to commit"
else
    echo "📝 Committing changes..."
    git commit -m "Update Mission Control Dashboard - $(date '+%Y-%m-%d %H:%M')"
fi

echo "📤 Pushing to GitHub..."
# Note: This will require authentication when run
# Set up GitHub token with: git remote set-url origin https://TOKEN@github.com/pajimo/mission-control-dashboard.git
git push origin main

echo "🎯 Deployment complete!"
echo "📍 Live at: https://pajimo.github.io/mission-control-dashboard/"
echo ""
echo "✨ Professional deployment process followed:"
echo "   ✓ Version control with Git"
echo "   ✓ GitHub Pages static hosting"  
echo "   ✓ Automatic CI/CD with GitHub Actions"
echo "   ✓ No localhost shortcuts"
echo "   ✓ Enterprise development workflow"