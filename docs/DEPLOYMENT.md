# Deployment Guide

This guide covers various deployment options for DO.ffy, from local development to production hosting.

## Table of Contents

- [Development Deployment](#development-deployment)
- [Production Build](#production-build)
- [Static Hosting](#static-hosting)
- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Docker Deployment](#docker-deployment)
- [Environment Configuration](#environment-configuration)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Development Deployment

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git (for version control)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/doffy.git
   cd doffy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open http://localhost:5173 in your browser
   - The development server supports hot reloading

### Development Server Configuration

The Vite development server can be configured in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Allow external connections
    open: true, // Auto-open browser
  },
  preview: {
    port: 4173,
  }
});
```

## Production Build

### Building for Production

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Preview production build locally**
   ```bash
   npm run preview
   ```

3. **Build output**
   - Generated files are in the `dist/` directory
   - Optimized and minified for production
   - Includes source maps for debugging

### Build Configuration

Key build settings in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          reactflow: ['reactflow'],
        }
      }
    }
  }
});
```

## Static Hosting

DO.ffy is a client-side application that can be hosted on any static file server.

### Basic Static Hosting

1. Build the application: `npm run build`
2. Upload the `dist/` folder contents to your web server
3. Configure your server to serve `index.html` for all routes

### Server Configuration

#### Apache (.htaccess)
```apache
RewriteEngine On
RewriteRule ^(?!.*\.).*$ /index.html [L]
```

#### Nginx
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## GitHub Pages

### Automatic Deployment with GitHub Actions

The repository includes a GitHub Actions workflow for automatic deployment:

1. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Select "GitHub Actions" as the source

2. **Workflow Configuration**
   The `.github/workflows/ci.yml` file handles:
   - Building the application
   - Running tests and linting
   - Deploying to GitHub Pages

3. **Custom Domain (Optional)**
   - Add a `CNAME` file to the `public/` directory
   - Configure DNS settings for your domain

### Manual GitHub Pages Deployment

```bash
# Build the application
npm run build

# Install gh-pages utility
npm install -g gh-pages

# Deploy to GitHub Pages
gh-pages -d dist
```

## Netlify

### Drag and Drop Deployment

1. Build the application: `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag the `dist/` folder to the deployment area

### Git-based Deployment

1. **Connect repository**
   - Link your GitHub repository to Netlify

2. **Build settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment variables** (if needed)
   - Set any required environment variables in Netlify dashboard

### Netlify Configuration File

Create `netlify.toml` in the project root:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## Vercel

### Vercel CLI Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Git Integration

1. **Connect repository**
   - Import your GitHub repository in Vercel dashboard

2. **Build settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Vercel Configuration

Create `vercel.json` in the project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Docker Deployment

### Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

Create `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Docker Commands

```bash
# Build image
docker build -t doffy .

# Run container
docker run -p 8080:80 doffy

# Docker Compose (optional)
docker-compose up -d
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  doffy:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

## Environment Configuration

### Environment Variables

Create `.env` files for different environments:

#### `.env.development`
```
VITE_APP_NAME=DO.ffy Development
VITE_API_URL=http://localhost:3000
```

#### `.env.production`
```
VITE_APP_NAME=DO.ffy
VITE_API_URL=https://api.doffy.com
```

### Using Environment Variables

```javascript
// In your React components
const appName = import.meta.env.VITE_APP_NAME;
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Optimization

### Build Optimization

1. **Code Splitting**
   ```javascript
   // Lazy load components
   const LazyComponent = lazy(() => import('./LazyComponent'));
   ```

2. **Bundle Analysis**
   ```bash
   npm install -g vite-bundle-analyzer
   npx vite-bundle-analyzer
   ```

3. **Asset Optimization**
   - Images: Use WebP format when possible
   - Fonts: Preload critical fonts
   - Icons: Use SVG sprites for better caching

### Caching Strategy

#### Service Worker (Optional)

```javascript
// public/sw.js
const CACHE_NAME = 'doffy-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

#### HTTP Headers

```nginx
# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Cache HTML with short expiry
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

## Troubleshooting

### Common Issues

#### 1. Build Failures

**Problem**: Build fails with memory errors
```bash
# Solution: Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### 2. Routing Issues

**Problem**: 404 errors on page refresh
```bash
# Solution: Configure server for SPA routing
# See server configuration examples above
```

#### 3. Asset Loading Issues

**Problem**: Assets not loading in production
```javascript
// Solution: Check base URL configuration
export default defineConfig({
  base: '/doffy/', // For subdirectory deployment
  // or
  base: '/', // For root domain deployment
});
```

#### 4. Performance Issues

**Problem**: Slow loading times
```bash
# Solutions:
# 1. Enable gzip compression
# 2. Optimize images
# 3. Use CDN for static assets
# 4. Implement lazy loading
```

### Debugging Production Issues

1. **Enable source maps**
   ```javascript
   export default defineConfig({
     build: {
       sourcemap: true
     }
   });
   ```

2. **Error monitoring**
   ```javascript
   // Add error tracking service
   window.addEventListener('error', (event) => {
     console.error('Global error:', event.error);
     // Send to monitoring service
   });
   ```

3. **Performance monitoring**
   ```javascript
   // Monitor Core Web Vitals
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

   getCLS(console.log);
   getFID(console.log);
   getFCP(console.log);
   getLCP(console.log);
   getTTFB(console.log);
   ```

### Health Checks

Create a health check endpoint:

```javascript
// public/health.json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Monitoring

#### Basic Monitoring

```javascript
// Monitor application errors
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Monitor performance
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Performance entry:', entry);
  }
});
observer.observe({ entryTypes: ['navigation', 'resource'] });
```

## Security Considerations

### Content Security Policy

```html
<!-- Add to index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: blob:;">
```

### HTTPS Configuration

Always deploy with HTTPS in production:

```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
}
```

This deployment guide covers the most common scenarios for hosting DO.ffy. Choose the option that best fits your needs and infrastructure requirements.