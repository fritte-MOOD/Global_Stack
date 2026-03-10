# Deployment Guide

## 1. Turso Database Setup

1. **Create Turso Account**: Go to https://turso.tech and sign up
2. **Create Database**: 
   - Click "Create Database"
   - Name: `global-stack-prod` (or any name you prefer)
   - Location: Choose closest to your users
3. **Get Credentials**:
   - Database URL: `libsql://your-db-name-your-org.turso.io`
   - Auth Token: Generate in Settings → Auth Tokens

## 2. Deploy Database Schema

```bash
# Set environment variables
export TURSO_DATABASE_URL="libsql://your-db-name-your-org.turso.io"
export TURSO_AUTH_TOKEN="your-auth-token-here"

# Deploy schema and seed data
npm run db:deploy
```

## 3. Vercel Deployment

1. **Connect Repository**:
   - Go to https://vercel.com
   - Import your GitHub repository
   
2. **Set Environment Variables**:
   ```
   TURSO_DATABASE_URL=libsql://your-db-name-your-org.turso.io
   TURSO_AUTH_TOKEN=your-auth-token-here
   NEXTAUTH_SECRET=generate-a-secure-random-string
   NEXTAUTH_URL=https://your-app.vercel.app
   ```

3. **Deploy**: Vercel will automatically build and deploy

## 4. Verify Deployment

- Landing Page: `https://your-app.vercel.app`
- OpenOS Demo: `https://your-app.vercel.app/open-os/client`
- Workspace: `https://your-app.vercel.app/workspace`

## Local Development

The app automatically uses local SQLite in development:

```bash
npm run dev
npm run db:seed    # Seed local database
npm run db:studio  # Open Prisma Studio
```

## Troubleshooting

**Build fails**: Check that all environment variables are set correctly
**Database errors**: Verify Turso credentials and run `npm run db:deploy`
**Auth issues**: Ensure NEXTAUTH_SECRET is set and NEXTAUTH_URL matches your domain