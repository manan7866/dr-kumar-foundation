# GitHub Actions Secrets Setup Guide

## Required Secrets for CI/CD Pipeline

This document lists all the GitHub secrets you need to configure for the CI/CD workflows to function properly.

---

## 🔐 How to Add Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret listed below

---

## 📋 Required Secrets

### Database Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/dbname?sslmode=require` |

### Authentication Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `NEXTAUTH_SECRET` | Secret for NextAuth session encryption | Generate with: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your application URL | `https://yourdomain.com` |

### Cloudinary Secrets (Optional - for image uploads)

| Secret Name | Description | Where to Find |
|-------------|-------------|---------------|
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | [Cloudinary Console](https://cloudinary.com/console) |
| `CLOUDINARY_API_KEY` | Cloudinary API key | [Cloudinary Console](https://cloudinary.com/console) |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | [Cloudinary Console](https://cloudinary.com/console) |

### Email Secrets (Optional - for notifications)

| Secret Name | Description | Where to Find |
|-------------|-------------|---------------|
| `RESEND_API_KEY` | Resend API key for email sending | [Resend Console](https://resend.com/api-keys) |

---

## 🚀 Deployment Secrets (Choose Your Method)

### For Vercel Deployment

| Secret Name | Description |
|-------------|-------------|
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

### For AWS ECS Deployment

| Secret Name | Description |
|-------------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `AWS_REGION` | AWS region (e.g., `us-east-1`) |
| `ECS_CLUSTER` | ECS cluster name |
| `ECS_SERVICE` | ECS service name |

### For VPS/Docker Compose Deployment

| Secret Name | Description |
|-------------|-------------|
| `DEPLOY_SSH_KEY` | SSH private key for server access |
| `VPS_HOST` | Server hostname or IP |
| `VPS_USERNAME` | SSH username (e.g., `root`, `ubuntu`) |

---

## 📝 Environment-Specific Secrets

### Production Environment

1. Go to **Settings** → **Environments**
2. Click **New environment** → Name it `production`
3. Add production-specific secrets:
   - `DATABASE_URL` (production database)
   - `NEXTAUTH_URL` (production URL)
   - `NEXTAUTH_SECRET` (different from development)

### Staging Environment (Optional)

1. Create environment named `staging`
2. Add staging-specific secrets

---

## 🔑 Generate Secure Secrets

### Generate NEXTAUTH_SECRET

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Generate SSH Key for Deployment

```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy

# Add public key to your server's ~/.ssh/authorized_keys
cat ~/.ssh/github_actions_deploy.pub | ssh user@your-server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

# Copy private key to GitHub secrets
cat ~/.ssh/github_actions_deploy | pbcopy  # macOS
cat ~/.ssh/github_actions_deploy | clip    # Windows
```

---

## ✅ Verification Checklist

After adding secrets, verify your setup:

- [ ] Go to **Actions** tab
- [ ] Click on **CI/CD Pipeline** workflow
- [ ] Click **Run workflow**
- [ ] Select branch (main/develop)
- [ ] Monitor the workflow run
- [ ] Check that all jobs complete successfully

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use different secrets** for development and production
3. **Rotate secrets regularly** (especially API keys)
4. **Use environment protection rules** for production
5. **Limit secret access** to required workflows only
6. **Audit secret usage** in GitHub Actions logs
7. **Use OIDC for cloud providers** when possible (more secure than long-lived keys)

---

## 🆘 Troubleshooting

### Workflow fails with "secret not found"

- Double-check secret name matches exactly (case-sensitive)
- Ensure secret is added at repository level (not organization)
- Check if environment-specific secret is needed

### Database connection fails

- Verify `DATABASE_URL` includes all required parameters
- Check SSL mode is set correctly (`sslmode=require` for Neon)
- Ensure IP allowlist includes GitHub Actions runners

### Docker push fails

- Verify GitHub token has `packages: write` permission
- Check container registry is enabled in repository settings
- Ensure image name format is correct

---

## 📚 Additional Resources

- [GitHub Actions Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Environments Documentation](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [Neon Database Connection Guide](https://neon.tech/docs/connect/connect-from-any-app)
- [NextAuth.js Deployment Guide](https://next-auth.js.org/deployment)

---

**Need help?** Contact your DevOps team or check the workflow logs for detailed error messages.xyz error
