# GitHub Configuration

This directory contains GitHub Actions workflows and configuration files for CI/CD.

---

## 📁 Directory Structure

```
.github/
├── workflows/
│   ├── ci-cd.yml           # Main CI/CD pipeline
│   └── docker-deploy.yml   # Docker deployment workflow
├── SECRETS_SETUP.md        # Guide for setting up GitHub secrets
└── README.md               # This file
```

---

## 🔧 Workflows

### 1. CI/CD Pipeline (`workflows/ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**
1. **Lint & Type Check** - Code quality validation
2. **Build** - Build Next.js application
3. **Test** - Run tests (if configured)
4. **Docker** - Build and push Docker image to GHCR
5. **Deploy** - Deploy to production (customizable)
6. **Migrate DB** - Run database migrations

### 2. Docker Deploy (`workflows/docker-deploy.yml`)

**Triggers:**
- Manual trigger via GitHub Actions UI
- Push to `main` with Docker-related file changes

**Jobs:**
1. **Build & Push** - Create and push Docker image
2. **Deploy to Server** - SSH deployment to VPS
3. **Notify** - Send deployment notifications

---

## 🚀 Usage

### Run CI/CD Pipeline

The CI/CD pipeline runs automatically on:
- Push to `main` or `develop`
- Pull request creation

### Manual Deployment

1. Go to **Actions** tab
2. Select **Docker Compose Deploy**
3. Click **Run workflow**
4. Choose environment (production/staging)
5. Click **Run workflow**

---

## 🔐 Required Secrets

Configure these secrets in **Settings → Secrets and variables → Actions**:

### Minimum Required

```bash
DATABASE_URL              # PostgreSQL connection string
NEXTAUTH_SECRET           # NextAuth session secret
NEXTAUTH_URL              # Application URL
```

### Optional (for full functionality)

```bash
CLOUDINARY_CLOUD_NAME     # Cloudinary cloud name
CLOUDINARY_API_KEY        # Cloudinary API key
CLOUDINARY_API_SECRET     # Cloudinary API secret
RESEND_API_KEY            # Resend email API key
```

### For Deployment

```bash
# VPS Deployment
DEPLOY_SSH_KEY            # SSH private key
VPS_HOST                  # Server hostname/IP
VPS_USERNAME              # SSH username

# Vercel Deployment
VERCEL_TOKEN              # Vercel API token
VERCEL_ORG_ID             # Vercel organization ID
VERCEL_PROJECT_ID         # Vercel project ID
```

See [SECRETS_SETUP.md](SECRETS_SETUP.md) for detailed instructions.

---

## 🛡️ Security Best Practices

1. **Never commit secrets** - Use GitHub Secrets for all sensitive data
2. **Environment protection** - Use GitHub Environments for production
3. **Require reviewers** - Set up required reviewers for production deployments
4. **Limit permissions** - Use minimum required permissions in workflows
5. **Audit logs** - Regularly review Actions logs for suspicious activity

---

## 📊 Workflow Status Badges

Add these to your README.md:

```markdown
<!-- CI/CD Status -->
[![CI/CD Pipeline](../../actions/workflows/ci-cd.yml/badge.svg)](../../actions/workflows/ci-cd.yml)

<!-- Docker Deploy Status -->
[![Docker Deploy](../../actions/workflows/docker-deploy.yml/badge.svg)](../../actions/workflows/docker-deploy.yml)
```

---

## 🔧 Customization

### Add New Workflow

Create a new `.yml` file in `workflows/`:

```yaml
name: My Custom Workflow

on:
  push:
    branches: [main]

jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # Add your steps here
```

### Modify Existing Workflow

Edit the workflow `.yml` files in `workflows/` directory.

### Add Environment

1. Go to **Settings → Environments**
2. Click **New environment**
3. Name it (e.g., `production`, `staging`)
4. Configure protection rules
5. Add environment-specific secrets

---

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [GitHub Secrets Guide](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

---

**Last Updated:** March 2026
