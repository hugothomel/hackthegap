#!/bin/bash

# Hack the Gap - Railway Deployment Script

echo "🚀 Preparing to deploy Hack the Gap to Railway..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Initializing..."
    git init
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy Hack the Gap landing page to Railway" || echo "No changes to commit"

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo ""
    echo "⚠️  No git remote found!"
    echo ""
    echo "Please follow these steps:"
    echo "1. Create a new repository on GitHub"
    echo "2. Run: git remote add origin YOUR_GITHUB_REPO_URL"
    echo "3. Run: git branch -M main"
    echo "4. Run: git push -u origin main"
    echo ""
    echo "Then deploy on Railway:"
    echo "1. Go to https://railway.app/dashboard"
    echo "2. Click 'New Project'"
    echo "3. Select 'Deploy from GitHub repo'"
    echo "4. Select your hackthegap repository"
    echo ""
    exit 1
fi

# Push to remote
echo "⬆️  Pushing to remote repository..."
CURRENT_BRANCH=$(git branch --show-current)
git push origin "$CURRENT_BRANCH" || git push -u origin "$CURRENT_BRANCH"

echo ""
echo "✅ Code pushed successfully!"
echo ""
echo "📋 Next steps to deploy on Railway:"
echo "1. Go to https://railway.app/dashboard"
echo "2. Click 'New Project'"
echo "3. Select 'Deploy from GitHub repo'"
echo "4. Select your hackthegap repository"
echo "5. Railway will automatically detect the Dockerfile and deploy"
echo ""
echo "⏱️  Build time: ~2-3 minutes"
echo "🌐 Your app will be available at: https://YOUR-PROJECT.railway.app"
echo ""

