# Portfolio Website - Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (sign up at vercel.com)
- GitHub repository

### Steps

1. **Push code to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Environment Variables**
Add in Vercel dashboard:
```
VITE_API_URL=https://your-backend-url.com
```

4. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Vercel CLI Alternative
```bash
npm install -g vercel
cd frontend
vercel login
vercel --prod
```

---

## Backend Deployment (Railway)

### Prerequisites
- Railway account (sign up at railway.app)
- PostgreSQL database

### Steps

1. **Create Railway Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Add PostgreSQL Database**
   - In your project, click "New"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically provision it

3. **Configure Backend Service**
   - Click "New" → "GitHub Repo"
   - Select your repository
   - Set **Root Directory**: `backend`

4. **Environment Variables**
Railway auto-injects DATABASE_URL. Add these:

```bash
# JWT & Server
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
PORT=8080
FRONTEND_URL=https://your-vercel-app.vercel.app

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=your.email@example.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Database (from PostgreSQL plugin)
DB_HOST=${{PGHOST}}
DB_PORT=${{PGPORT}}
DB_USER=${{PGUSER}}
DB_PASSWORD=${{PGPASSWORD}}
DB_NAME=${{PGDATABASE}}
DB_SSLMODE=require

# Environment
ENV=production
```

5. **Deploy**
   - Railway will auto-deploy on git push
   - Get your public URL from Railway dashboard

6. **Update Frontend**
Update `vercel.json` với Railway URL:
```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://your-railway-url.up.railway.app/api/$1"
    }
  ]
}
```

---

## Alternative: Backend on Render.com

### Steps

1. **Create New Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repository

2. **Configuration**
   - **Name**: portfolio-backend
   - **Root Directory**: `backend`
   - **Environment**: Go
   - **Build Command**: `go build -o main main.go`
   - **Start Command**: `./main`

3. **Add PostgreSQL Database**
   - Click "New +" → "PostgreSQL"
   - Copy connection string

4. **Environment Variables**
Same as Railway, but use Render's database URL:
```
DATABASE_URL=<from Render PostgreSQL>
```

---

## Post-Deployment Checklist

### Backend
- [ ] Database connected successfully
- [ ] Health check endpoint working (`/health`)
- [ ] API endpoints responding
- [ ] CORS configured with frontend URL
- [ ] SSL/HTTPS enabled
- [ ] Environment variables set correctly
- [ ] Email service working (test contact form)
- [ ] Image upload working (test Cloudinary)

### Frontend
- [ ] Site loads correctly
- [ ] API calls working
- [ ] Images loading
- [ ] Forms submitting
- [ ] Routing works (all pages accessible)
- [ ] SEO meta tags present (view page source)
- [ ] Mobile responsive
- [ ] PWA manifest (optional)

### Security
- [ ] HTTPS enforced
- [ ] Strong JWT secret
- [ ] Database SSL enabled
- [ ] API rate limiting (consider adding)
- [ ] Input validation working
- [ ] No sensitive data in client code

### Performance
- [ ] Assets optimized
- [ ] Images lazy loaded
- [ ] Code splitting enabled
- [ ] Caching headers set
- [ ] CDN configured (optional)

---

## Testing Production

### Backend API Test
```bash
# Health check
curl https://your-backend-url.com/health

# Get projects
curl https://your-backend-url.com/api/projects

# Test contact form
curl -X POST https://your-backend-url.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello"}'
```

### Frontend Test
- Visit https://your-vercel-app.vercel.app
- Test all features
- Check console for errors
- Test on mobile devices

---

## Monitoring & Maintenance

### Vercel
- View deployment logs in dashboard
- Monitor usage and bandwidth
- Set up deployment notifications

### Railway/Render
- Monitor server logs
- Check database usage
- Set up crash alerts
- Monitor API response times

### Database Backup
Railway và Render tự động backup, nhưng nên:
- Regular manual backups
- Export data periodically
- Test restore procedures

---

## Troubleshooting

### CORS Errors
Ensure backend `.env` has correct frontend URL:
```bash
FRONTEND_URL=https://your-actual-vercel-url.vercel.app
```

### Database Connection Fails
- Check DATABASE_URL format
- Verify SSL mode (`require` for production)
- Check firewall rules

### API Not Found (404)
- Verify vercel.json routes
- Check backend is deployed and running
- Confirm API base URL in frontend

### Build Failures
- Check Go version compatibility
- Verify all dependencies in go.mod
- Review build logs carefully

---

## Custom Domain Setup

### Frontend (Vercel)
1. Add domain in Vercel dashboard
2. Configure DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Backend (Railway/Render)
1. Add custom domain in dashboard
2. Configure DNS:
   ```
   Type: CNAME
   Name: api
   Value: your-app.up.railway.app
   ```

---

## Costs Estimate

### Free Tier (Development)
- **Vercel**: Free (100GB bandwidth/month)
- **Railway**: $5 credit/month (enough for small projects)
- **Render**: Free tier available
- **PostgreSQL**: Included with Railway/Render

### Production (Recommended)
- **Vercel Pro**: $20/month (better limits)
- **Railway**: ~$10-20/month (based on usage)
- **SendGrid**: Free (100 emails/day)
- **Cloudinary**: Free (25GB storage)

**Total**: ~$30-40/month for full featured production site

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Go Deployment**: https://go.dev/doc/tutorial/web-service-gin

---

Happy Deploying! 🚀
