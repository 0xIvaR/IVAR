# 🚀 IVAR Deployment Guide

This guide covers different deployment options for IVAR Voice Assistant.

## 📋 Prerequisites

- Node.js 18+
- Git
- Your preferred deployment platform account

## 🌐 Web Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/IvaR2227/IVAR)

**Automatic Deployment:**
1. Click the deploy button above
2. Connect your GitHub account
3. Import the IVAR repository
4. Configure environment variables in Vercel dashboard
5. Deploy!

**Manual Deployment:**
```bash
# Install Vercel CLI
npm install -g vercel

# Build the project
npm run build

# Deploy
vercel --prod
```

**Environment Variables in Vercel:**
- `OPENAI_API_KEY` - Your OpenAI API key
- `GEMINI_API_KEY` - Your Google Gemini API key

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/IvaR2227/IVAR)

**Via CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

**Via Git Integration:**
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/IvaR2227/IVAR)

**Full-stack deployment with backend:**
1. Click the Railway button above
2. Connect your GitHub account
3. Select the IVAR repository
4. Configure environment variables
5. Deploy both frontend and backend

## 🐳 Docker Deployment

### Local Docker

**Production Build:**
```bash
# Build the image
docker build -t ivar-assistant .

# Run frontend (production)
docker run -p 3000:80 --target production ivar-assistant

# Run backend
docker run -p 5000:5000 --target server ivar-assistant
```

**Development with Docker Compose:**
```bash
# Start development environment
docker-compose --profile dev up

# Start production environment
docker-compose up
```

### Docker Hub

**Push to Docker Hub:**
```bash
# Tag the image
docker tag ivar-assistant IvaR2227/ivar-assistant:latest

# Push to Docker Hub
docker push IvaR2227/ivar-assistant:latest
```

## ☁️ Cloud Platforms

### AWS

**Using AWS Amplify:**
1. Connect your GitHub repository to AWS Amplify
2. Set build settings:
   ```yaml
   version: 1
   applications:
     - frontend:
         phases:
           preBuild:
             commands:
               - npm ci
           build:
             commands:
               - npm run build
         artifacts:
           baseDirectory: dist
           files:
             - '**/*'
         cache:
           paths:
             - node_modules/**/*
   ```

**Using AWS S3 + CloudFront:**
```bash
# Build the project
npm run build

# Sync to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Google Cloud Platform

**Using Firebase Hosting:**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

### Azure

**Using Azure Static Web Apps:**
1. Create a new Static Web App in Azure Portal
2. Connect your GitHub repository
3. Set build configuration:
   - App location: `/`
   - API location: `server`
   - Output location: `dist`

## 📱 Mobile App Deployment

### React Native (Future)

**Prepare for mobile:**
```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios

# Initialize Capacitor
npx cap init

# Build web assets
npm run build

# Add platforms
npx cap add android
npx cap add ios

# Sync and open in IDE
npx cap sync
npx cap open android
npx cap open ios
```

## 🔧 Environment Configuration

### Required Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key for GPT | Optional | `sk-...` |
| `GEMINI_API_KEY` | Google Gemini API key | Optional | `AI...` |
| `PORT` | Server port | No | `5000` |
| `NODE_ENV` | Environment mode | No | `production` |

### Platform-Specific Setup

**Vercel:**
- Add environment variables in Project Settings → Environment Variables
- Automatic deployments on git push to main branch

**Netlify:**
- Add environment variables in Site Settings → Environment Variables
- Configure build hooks for automatic deployment

**Railway:**
- Add environment variables in Project Settings → Variables
- Supports both frontend and backend deployment

**Heroku:**
```bash
# Set environment variables
heroku config:set OPENAI_API_KEY=your_key_here
heroku config:set GEMINI_API_KEY=your_key_here

# Deploy
git push heroku main
```

## 🔄 CI/CD Pipeline

The project includes GitHub Actions for automated deployment:

**.github/workflows/ci.yml** - Automatic testing and deployment

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch

**Features:**
- Multi-node testing (Node.js 18, 20)
- Automatic building
- Deployment to GitHub Pages
- Lighthouse performance testing

## 🌍 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS settings

### Cloudflare (Recommended)
1. Add your domain to Cloudflare
2. Update nameservers
3. Configure SSL/TLS settings
4. Set up page rules for caching

## 📊 Monitoring & Analytics

### Performance Monitoring

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

**Google Analytics:**
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Error Tracking

**Sentry:**
```bash
npm install @sentry/react @sentry/tracing
```

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**
- Check Node.js version (requires 18+)
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall

**Voice Features Not Working:**
- Ensure HTTPS deployment (required for microphone access)
- Check browser permissions
- Verify browser compatibility

**API Integration Issues:**
- Verify environment variables are set correctly
- Check API key validity
- Ensure backend server is running

### Platform-Specific Issues

**Vercel:**
- Function timeout: Upgrade to Pro plan for longer timeouts
- Build size: Enable output file compression

**Netlify:**
- Form submissions: Enable Netlify Forms if using contact forms
- Redirects: Configure `_redirects` file for SPA routing

**Railway:**
- Port configuration: Ensure PORT environment variable is set
- Resource limits: Monitor usage in dashboard

## 📞 Support

If you encounter deployment issues:
- Check the [GitHub Issues](https://github.com/IvaR2227/IVAR/issues)
- Join our [Community Discussions](https://github.com/IvaR2227/IVAR/discussions)
- Read the [troubleshooting guide](https://github.com/IvaR2227/IVAR/wiki/Troubleshooting)

---

Happy deploying! 🚀 