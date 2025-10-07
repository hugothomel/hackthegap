# Railway Deployment Guide

## Prerequisites
- A [Railway](https://railway.app) account
- Git installed locally
- Railway CLI (optional)

## Option 1: Deploy via Railway Dashboard (Recommended)

### Step 1: Initialize Git Repository
```bash
cd /Users/hugohernandez/labzone/hackthegap
git init
git add .
git commit -m "Initial commit - Hack the Gap landing page"
```

### Step 2: Push to GitHub
1. Create a new repository on GitHub
2. Push your code:
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Railway
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your `hackthegap` repository
6. Railway will automatically:
   - Detect the Dockerfile
   - Build the Docker image
   - Deploy your application
7. Once deployed, click on your service to get the public URL

## Option 2: Deploy via Railway CLI

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway
```bash
railway login
```

### Step 3: Initialize and Deploy
```bash
cd /Users/hugohernandez/labzone/hackthegap
railway init
railway up
```

### Step 4: Generate Domain
```bash
railway domain
```

## Configuration

### Environment Variables
If you need to add environment variables:
1. Go to your project in Railway Dashboard
2. Click on your service
3. Go to **Variables** tab
4. Add any needed variables (e.g., `NODE_ENV=production`)

### Custom Domain
To add a custom domain:
1. Go to your service in Railway Dashboard
2. Click on **Settings**
3. Scroll to **Domains**
4. Click **Generate Domain** or **Add Custom Domain**

## Files Created

- **Dockerfile**: Multi-stage build for optimized production image
- **.dockerignore**: Excludes unnecessary files from Docker build
- **railway.json**: Railway-specific configuration

## Build Configuration

The Dockerfile uses:
- **Node.js 20 Alpine**: Lightweight base image
- **Multi-stage build**: Separate build and runtime stages
- **Production optimization**: Only production dependencies in final image
- **Port 3000**: Default Next.js port

## Troubleshooting

### Build fails
- Check Railway logs in the dashboard
- Ensure all dependencies are in `package.json`
- Verify Dockerfile syntax

### App not accessible
- Make sure Railway generated a domain
- Check if the service is running in Railway dashboard
- Verify PORT environment variable is set to 3000

### Build is slow
- Railway caches Docker layers for faster subsequent builds
- First deployment may take 2-3 minutes

## Post-Deployment

Your Hack the Gap landing page will be live at:
```
https://YOUR-PROJECT-NAME.railway.app
```

Railway provides:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-deploys on git push
- ✅ Zero-downtime deployments
- ✅ Automatic health checks

## Cost
Railway offers:
- **$5 free credit per month** (hobby plan)
- Additional usage billed by resource consumption
- Estimated cost: ~$5-10/month for a low-traffic landing page

