#!/usr/bin/env node

/**
 * deploy-db.js — Database deployment script for Turso
 * 
 * This script pushes the Prisma schema to Turso and seeds the database.
 * Run after setting TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in environment.
 */

const { execSync } = require('child_process');

console.log('🚀 Deploying database to Turso...\n');

try {
  // Check environment variables
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    console.error('❌ Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN');
    console.log('Please set these environment variables first.');
    process.exit(1);
  }

  console.log('1️⃣ Pushing Prisma schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });

  console.log('\n2️⃣ Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  console.log('\n3️⃣ Seeding database...');
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' });

  console.log('\n✅ Database deployment complete!');
  console.log('Your app is ready to deploy to Vercel.');

} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  process.exit(1);
}