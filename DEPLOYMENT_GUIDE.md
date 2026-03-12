# 🚀 Deployment Guide - Dr. Kumar Foundation Website

Complete deployment guide for deploying the Dr. Kumar Foundation website using Docker Compose and GitHub Actions.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Docker Compose Deployment](#docker-compose-deployment)
4. [GitHub Actions CI/CD](#github-actions-cicd)
5. [Production Deployment Options](#production-deployment-options)
6. [Environment Variables Reference](#environment-variables-reference)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Software

- **Node.js** v20 or higher
- **Docker** v20+ and **Docker Compose** v2+
- **Git** for version control
- **PostgreSQL** (for local development without Docker)

### Required Accounts

- [Neon Database](https://neon.tech) - PostgreSQL hosting
- [Cloudinary](https://cloudinary.com) - Image hosting (optional)
- [Resend](https://resend.com) - Email service (optional)
- [GitHub](https://github.com) - For CI/CD

---

## 💻 Local Development

### 1. Clone and Setup

```bash
# Clone repository
git clone <your-repo-url>
cd dr-kumar-foundation

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### 2. Configure Environment

Edit `.env` file with your credentials:

```env
# Use Neon database for development
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-your-host.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Or use local PostgreSQL with Docker
POSTGRES_USER=drkumar_admin
POSTGRES_PASSWORD=DrKumar2024SecurePassword
POSTGRES_DB=drkumar_foundation

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-new-secret>
```

### 3. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with initial data
npm run db:seed

# Create admin user
node --import tsx prisma/create-default-admin.ts
```

### 4. Start Development Server

```bash
# Start Next.js dev server
npm run dev

# Or use Docker Compose (development profile)
docker-compose --profile dev up app-dev
```

Access:
- **Application**: http://localhost:3000
- **Prisma Studio**: `npx prisma studio` (http://localhost:5555)

---

## 🐳 Docker Compose Deployment

### Production Deployment with Docker

#### Option A: Using Local PostgreSQL

```bash
# Start all services (app + database)
docker-compose up -d

# View logs
docker-compose logs -f app

# Check status
docker-compose ps
```

#### Option B: Using External Database (Neon)

1. Update `docker-compose.yml` to use external DATABASE_URL
2. Remove or comment out the `db` service
3. Deploy:

```bash
docker-compose up -d app
```

### Development with Hot Reload

```bash
# Start development environment with hot reload
docker-compose --profile dev up app-dev db

# Access application
# http://localhost:3000

# Access pgAdmin (optional)
# http://localhost:5050
```

### Docker Commands Reference

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Restart services
docker-compose restart

# Rebuild containers
docker-compose build --no-cache

# Run database migrations
docker-compose exec app npx prisma migrate deploy

# Access container shell
docker-compose exec app sh

# View container status
docker-compose ps

# Clean up volumes (WARNING: deletes data)
docker-compose down -v
```

---

## ⚙️ GitHub Actions CI/CD

### Workflow Overview

The project includes two GitHub Actions workflows:

1. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
   - Lint and type check
   - Build application
   - Run tests
   - Build and push Docker image
   - Deploy to production
   - Database migrations

2. **Docker Compose Deploy** (`.github/workflows/docker-deploy.yml`)
   - Manual deployment trigger
   - SSH-based deployment to VPS
   - Deployment notifications

### Setup GitHub Secrets

See [`.github/SECRETS_SETUP.md`](.github/SECRETS_SETUP.md) for complete list.

**Minimum required secrets:**

```bash
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

### Trigger Deployment

#### Automatic (on push to main)

```bash
git push origin main
```

#### Manual Deployment

1. Go to **Actions** tab
2. Select **Docker Compose Deploy**
3. Click **Run workflow**
4. Select environment (production/staging)
5. Click **Run workflow**

---

## 🌐 Production Deployment Options

### Option 1: Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Environment variables to set in Vercel dashboard:**
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `CLOUDINARY_*` variables

### Option 2: Docker on VPS

```bash
# On your VPS
git clone <repo>
cd dr-kumar-foundation

# Create .env file
cp .env.example .env
# Edit .env with production values

# Deploy with Docker Compose
docker-compose up -d

# Setup reverse proxy (Nginx example)
# See nginx.conf.example
```

### Option 3: AWS ECS/Fargate

1. Build and push Docker image to ECR
2. Create ECS task definition
3. Create ECS service
4. Configure Application Load Balancer
5. Set up RDS PostgreSQL or use Neon

### Option 4: Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

---

## 📝 Environment Variables Reference

### Database

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `POSTGRES_USER` | For Docker | Database user |
| `POSTGRES_PASSWORD` | For Docker | Database password |
| `POSTGRES_DB` | For Docker | Database name |

### Authentication

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXTAUTH_URL` | ✅ | Application URL |
| `NEXTAUTH_SECRET` | ✅ | Session encryption secret (min 32 chars) |

### Cloudinary (Optional)

| Variable | Required | Description |
|----------|----------|-------------|
| `CLOUDINARY_CLOUD_NAME` | For uploads | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | For uploads | API key |
| `CLOUDINARY_API_SECRET` | For uploads | API secret |
| `CLOUDINARY_UPLOAD_FOLDER` | No | Upload folder (default: dr-kumar-profiles) |

### Email (Optional)

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | For emails | Resend API key |
| `EMAIL_FROM` | For emails | Sender email address |

### pgAdmin (Docker only)

| Variable | Required | Description |
|----------|----------|-------------|
| `PGADMIN_EMAIL` | For pgAdmin | pgAdmin login email |
| `PGADMIN_PASSWORD` | For pgAdmin | pgAdmin login password |

---

## 🔍 Troubleshooting

### Database Connection Issues

**Error: SSL required**

```env
# Add to DATABASE_URL
?sslmode=require
```

**Error: IP not allowed**

- Go to Neon Dashboard → Settings → IP Allow
- Add your IP or `0.0.0.0/0` for all IPs

**Error: Table doesn't exist**

```bash
npx prisma db push
```

### Docker Issues

**Container won't start**

```bash
# Check logs
docker-compose logs app

# Rebuild without cache
docker-compose build --no-cache app

# Restart services
docker-compose down && docker-compose up -d
```

**Port already in use**

```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use 3001 instead of 3000
```

### GitHub Actions Issues

**Workflow fails on secrets**

- Check secret names match exactly (case-sensitive)
- Verify secrets are set at repository level
- Check environment-specific secrets

**Docker push fails**

```yaml
# Ensure permissions in workflow
permissions:
  contents: read
  packages: write
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma Client
npx prisma generate
```

---

## 📊 Monitoring and Maintenance

### Health Checks

```bash
# Application health endpoint
curl http://localhost:3000/api/health

# Database connection
docker-compose exec db pg_isready -U drkumar_admin

# View application logs
docker-compose logs -f app
```

### Database Backups

```bash
# Backup database (Docker PostgreSQL)
docker-compose exec db pg_dump -U drkumar_admin drkumar_foundation > backup.sql

# Restore database
docker-compose exec -T db psql -U drkumar_admin drkumar_foundation < backup.sql

# Backup Neon database
# Use Neon dashboard or pg_dump with connection string
```

### Regular Maintenance

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Clean Docker
docker system prune -af

# Rotate logs
docker-compose logs --tail=100
```

---

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Generate new `NEXTAUTH_SECRET` for production
- [ ] Set correct `NEXTAUTH_URL` for production domain
- [ ] Enable HTTPS on production domain
- [ ] Restrict database IP access
- [ ] Set up regular database backups
- [ ] Enable GitHub Actions deployment protection
- [ ] Review and update CORS settings
- [ ] Set up rate limiting
- [ ] Configure monitoring and alerting

---

## 📚 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Neon Database Documentation](https://neon.tech/docs)

---

## 🆘 Support

For issues or questions:

1. Check existing issues in the repository
2. Review error logs (`docker-compose logs`)
3. Consult the troubleshooting section above
4. Contact the development team

---

**Last Updated:** March 2026  
**Version:** 1.0.0
