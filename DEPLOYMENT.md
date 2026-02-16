# 🚀 Deployment Guide - Student Assistant

Panduan lengkap untuk deploy Student Assistant ke production.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Railway)](#backend-deployment-railway)
- [Alternative Deployments](#alternative-deployments)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

---

## Prerequisites

Sebelum deploy, pastikan Anda memiliki:

- [x] GitHub account
- [x] Vercel account (untuk frontend)
- [x] Railway/Heroku account (untuk backend)
- [x] Google Gemini API Key
- [x] Repository di GitHub

---

## Frontend Deployment (Vercel)

### Method 1: Automatic Deployment via GitHub

#### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
cd student-assistant
git init
git add .
git commit -m "Initial commit"

# Create repository di GitHub, lalu:
git remote add origin https://github.com/YOUR_USERNAME/student-assistant.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Vercel

1. **Login ke Vercel**: https://vercel.com/login
2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables**:
   ```
   VITE_API_URL = https://your-backend-url.railway.app/api
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at: `https://student-assistant-xxx.vercel.app`

#### Step 3: Setup Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain: `studentassistant.com`
3. Configure DNS:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

---

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel

# Deploy to production
vercel --prod
```

---

## Backend Deployment (Railway)

### Step 1: Prepare Backend

#### Update .env for Production

Create `.env.production`:

```env
APP_NAME="Student Assistant"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app.railway.app

DB_CONNECTION=mysql
DB_HOST=${MYSQL_HOST}
DB_PORT=${MYSQL_PORT}
DB_DATABASE=${MYSQL_DATABASE}
DB_USERNAME=${MYSQL_USER}
DB_PASSWORD=${MYSQL_PASSWORD}

GEMINI_API_KEY=your_production_gemini_key
GEMINI_MODEL=gemini-2.5-flash

FRONTEND_URL=https://your-frontend.vercel.app

SESSION_DRIVER=database
CACHE_DRIVER=database
```

#### Add Procfile

Create `backend/Procfile`:

```
web: php artisan serve --host=0.0.0.0 --port=$PORT
```

#### Add runtime.txt

Create `backend/runtime.txt`:

```
php-8.2.0
```

---

### Step 2: Deploy to Railway

1. **Login to Railway**: https://railway.app/login

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add MySQL Database**:
   - Click "New" → "Database" → "Add MySQL"
   - Railway will auto-generate credentials

4. **Configure Backend Service**:
   
   **Root Directory**: `backend`
   
   **Build Command**:
   ```bash
   composer install --optimize-autoloader --no-dev
   ```
   
   **Start Command**:
   ```bash
   php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT
   ```

5. **Add Environment Variables**:
   
   Go to Variables tab, add:
   ```
   APP_KEY=base64:your_generated_key
   APP_ENV=production
   APP_DEBUG=false
   GEMINI_API_KEY=your_key_here
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

6. **Generate APP_KEY**:
   ```bash
   # Locally
   php artisan key:generate --show
   # Copy the output to Railway's APP_KEY variable
   ```

7. **Deploy**:
   - Click "Deploy"
   - Railway will auto-deploy
   - Your API will be at: `https://student-assistant.railway.app`

---

### Step 3: Update Frontend with Backend URL

Update Vercel environment variables:

```
VITE_API_URL = https://student-assistant.railway.app/api
```

Redeploy frontend to apply changes.

---

## Alternative Deployments

### Option 1: Netlify (Frontend)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd frontend
netlify deploy --prod
```

**netlify.toml**:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 2: Heroku (Backend)

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
cd backend
heroku create student-assistant-api

# Add MySQL addon
heroku addons:create jawsdb:kitefin

# Set buildpack
heroku buildpacks:set heroku/php

# Deploy
git push heroku main

# Run migrations
heroku run php artisan migrate --force

# Set env variables
heroku config:set APP_KEY=$(php artisan key:generate --show)
heroku config:set GEMINI_API_KEY=your_key
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
```

---

### Option 3: DigitalOcean App Platform

**Frontend**:
1. Create New App → GitHub
2. Select repository
3. Configure:
   ```
   Type: Static Site
   Build Command: cd frontend && npm install && npm run build
   Output Directory: frontend/dist
   ```

**Backend**:
1. Add Component → Web Service
2. Configure:
   ```
   Type: Web Service
   Build Command: cd backend && composer install --optimize-autoloader --no-dev
   Run Command: cd backend && php artisan serve --host=0.0.0.0 --port=8080
   ```

---

### Option 4: VPS (Ubuntu)

#### Full Stack Deployment

```bash
# Connect to VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install LEMP Stack
apt install nginx mysql-server php8.2-fpm php8.2-mysql composer -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install nodejs -y

# Clone repository
cd /var/www
git clone https://github.com/YOUR_USERNAME/student-assistant.git
cd student-assistant

# Backend setup
cd backend
composer install --optimize-autoloader --no-dev
cp .env.example .env
php artisan key:generate

# Configure database
mysql -u root -p
CREATE DATABASE student_assistant;
CREATE USER 'student_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL ON student_assistant.* TO 'student_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Update .env
nano .env
# Set database credentials

# Run migrations
php artisan migrate --force
php artisan optimize

# Set permissions
chown -R www-data:www-data /var/www/student-assistant
chmod -R 755 /var/www/student-assistant

# Frontend setup
cd ../frontend
npm install
npm run build

# Configure Nginx
nano /etc/nginx/sites-available/student-assistant
```

**Nginx Configuration**:
```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;
    root /var/www/student-assistant/backend/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/student-assistant/frontend/dist;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/student-assistant /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# Setup SSL with Let's Encrypt
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

---

## Environment Variables

### Frontend (.env or Vercel)

```env
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (.env or Railway/Heroku)

```env
APP_NAME="Student Assistant"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-backend-url.com

DB_CONNECTION=mysql
DB_HOST=your_db_host
DB_PORT=3306
DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
GEMINI_TEMPERATURE=0.7
GEMINI_MAX_TOKENS=2048

FRONTEND_URL=https://your-frontend-url.com

SESSION_DRIVER=database
CACHE_DRIVER=database
QUEUE_CONNECTION=database

LOG_CHANNEL=stack
LOG_LEVEL=error
```

---

## Post-Deployment

### 1. Test Deployment

```bash
# Test backend health
curl https://your-backend-url.com/

# Test API
curl https://your-backend-url.com/api/

# Test frontend
curl https://your-frontend-url.com/
```

### 2. Monitor Logs

**Railway**:
- Go to Deployments → View Logs

**Vercel**:
- Go to Project → Deployments → View Function Logs

**VPS**:
```bash
# Laravel logs
tail -f /var/www/student-assistant/backend/storage/logs/laravel.log

# Nginx logs
tail -f /var/log/nginx/error.log
```

### 3. Setup Monitoring

**Uptime Monitoring**:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://www.pingdom.com)

**Error Tracking**:
- [Sentry](https://sentry.io)
- [Bugsnag](https://www.bugsnag.com)

---

## Troubleshooting

### Issue: CORS Error in Production

**Solution**:
```php
// backend/config/cors.php
'allowed_origins' => [
    env('FRONTEND_URL'),
    'https://your-frontend.vercel.app',
],
```

### Issue: Database Connection Failed

**Solution**:
```bash
# Check environment variables
# Railway: Variables tab
# Heroku: heroku config
# VPS: cat backend/.env

# Test database connection
php artisan tinker
DB::connection()->getPdo();
```

### Issue: 500 Internal Server Error

**Solution**:
```bash
# Check logs
tail -f storage/logs/laravel.log

# Clear caches
php artisan optimize:clear

# Set permissions
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

---

## Security Checklist

- [x] APP_DEBUG=false in production
- [x] HTTPS enabled (SSL certificate)
- [x] Strong APP_KEY generated
- [x] Database credentials secure
- [x] GEMINI_API_KEY protected
- [x] CORS properly configured
- [x] Rate limiting enabled
- [x] Error logging configured
- [x] Backups configured
- [x] Monitoring setup

---

## Continuous Deployment

### GitHub Actions (Automated)

File: `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: |
          curl -X POST ${{ secrets.RAILWAY_WEBHOOK_URL }}
```

---

## Scaling Tips

### Database Optimization

```sql
-- Add indexes
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
```

### Caching

```php
// Use Redis for cache
CACHE_DRIVER=redis
REDIS_HOST=your-redis-host
```

### Queue Workers

```bash
# Process background jobs
php artisan queue:work --daemon
```

---

## Backup Strategy

### Automated Database Backup

```bash
# Cron job (daily backup)
0 2 * * * mysqldump -u user -p password student_assistant > backup_$(date +\%Y\%m\%d).sql
```

### Application Backup

```bash
# Backup files
tar -czf backup_$(date +%Y%m%d).tar.gz /var/www/student-assistant
```

---

## Cost Estimation

### Free Tier

| Service | Free Tier | Limit |
|---------|-----------|-------|
| Vercel | Yes | 100 GB bandwidth/month |
| Railway | $5 credit/month | ~500 hours |
| Gemini API | Yes | 60 req/min, 1.5K/day |

**Total**: ~$0-5/month for hobby projects

### Paid (Recommended for Production)

| Service | Cost | Features |
|---------|------|----------|
| Vercel Pro | $20/month | Custom domains, analytics |
| Railway Pro | $20/month | Higher limits, priority support |
| Digital Ocean | $6/month | 1GB RAM VPS |

**Total**: ~$20-50/month

---

## Support

Need help with deployment?

- **Documentation**: [README.md](../README.md)
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/student-assistant/issues)
- **Email**: support@studentassistant.com

---

**Happy Deploying! 🚀**

*Last Updated: February 2026*
