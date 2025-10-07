# 🚀 Railway Deployment - Quick Start

## ✅ What's Been Set Up

All Railway deployment files are ready:

- ✅ **Dockerfile** - Multi-stage production-optimized build
- ✅ **.dockerignore** - Excludes unnecessary files
- ✅ **railway.json** - Railway configuration
- ✅ **deploy.sh** - Deployment helper script
- ✅ **DEPLOYMENT.md** - Detailed deployment guide
- ✅ **Docker build tested** - Successfully builds locally

## 🎯 Deploy Now (3 Steps)

### Option A: Via GitHub (Recommended)

#### 1️⃣ Push to GitHub

If you don't have a GitHub remote set up yet:

```bash
# Create a new repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/hackthegap.git
git branch -M main
git push -u origin main
```

#### 2️⃣ Connect to Railway

1. Go to [railway.app/new](https://railway.app/new)
2. Click **"Deploy from GitHub repo"**
3. Authorize Railway to access GitHub
4. Select your `hackthegap` repository
5. Railway automatically detects the Dockerfile and starts building

#### 3️⃣ Get Your URL

- Railway builds in ~2-3 minutes
- Click your service → **Generate Domain**
- Your site is live at `https://hackthegap-production.up.railway.app`

### Option B: Via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Generate public domain
railway domain
```

## 🎨 Your Live Site

Once deployed, your Hack the Gap landing page will be at:
```
https://YOUR-PROJECT-NAME.railway.app
```

Features:
- ✅ Auto HTTPS
- ✅ Global CDN
- ✅ Auto-deploy on git push
- ✅ Zero-downtime deployments

## 💰 Cost

- **$5/month free credit** on hobby plan
- Estimated: ~$5-10/month for typical landing page traffic

## 🔧 Making Updates

After initial deployment:

```bash
# Make your changes to app/page.tsx
git add .
git commit -m "Update landing page"
git push

# Railway automatically rebuilds and deploys!
```

## 📝 Environment Variables

No environment variables needed for this app. If you need to add any later:

1. Railway Dashboard → Your Service → Variables
2. Add variables like `NODE_ENV=production`

## 🆘 Need Help?

See `DEPLOYMENT.md` for:
- Detailed troubleshooting
- Custom domain setup
- Advanced configuration

---

**Ready to deploy?** Run: `./deploy.sh` or follow Option A above! 🚀

