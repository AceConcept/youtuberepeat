# 🚀 Vercel Deployment Guide

This guide will walk you through deploying your YouTube Video Looper to Vercel using GitHub.

## Prerequisites

- A GitHub account
- Your project code pushed to a GitHub repository
- A Vercel account (free)

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your repository contains these files:
- `index.html`
- `styles.css`
- `script.js`
- `server.js`
- `package.json`
- `vercel.json` ✅ (already created)
- `README.md` ✅ (already updated)

### 2. Push to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with your GitHub account**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project settings:**
   - **Framework Preset**: `Node.js`
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
6. **Click "Deploy"**

#### Option B: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? → `Y`
   - Which scope? → Select your account
   - Link to existing project? → `N`
   - What's your project's name? → `youtube-video-looper`
   - In which directory is your code located? → `./`
   - Want to override the settings? → `N`

### 4. Your App is Live! 🎉

Vercel will provide you with a URL like:
`https://youtube-video-looper.vercel.app`

## Configuration Details

### vercel.json
This file tells Vercel how to deploy your app:
- Uses Node.js runtime
- Routes all requests to `server.js`
- Sets function timeout to 30 seconds

### server.js Updates
- Added CORS headers for better compatibility
- Added serverless environment detection
- Exports the app for Vercel

## Custom Domain (Optional)

To add a custom domain:

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your domain
4. Follow the DNS configuration instructions

## Environment Variables (if needed)

If your app needs environment variables:

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add your variables

## Troubleshooting

### Common Issues:

1. **Build fails**
   - Check that all files are committed to GitHub
   - Verify `package.json` has correct dependencies
   - Check Vercel build logs

2. **App doesn't load**
   - Verify `vercel.json` is in the root directory
   - Check that `server.js` exports the app
   - Look at Vercel function logs

3. **Static files not loading**
   - Ensure paths in HTML are correct
   - Check that files are in the repository

### Getting Help:

- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- View deployment logs in Vercel dashboard
- Check GitHub repository for any issues

## Next Steps

After deployment:

1. **Test your app** thoroughly
2. **Share the URL** with others
3. **Monitor performance** in Vercel dashboard
4. **Set up custom domain** if desired

Your YouTube Video Looper is now live on the internet! 🌐 