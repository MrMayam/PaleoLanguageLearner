#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building minimal production version...');

try {
  // Build client with timeout protection
  console.log('Building client assets...');
  execSync('timeout 60s vite build --mode production', { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_ENV: 'production',
      VITE_STRIPE_PUBLIC_KEY: 'pk_placeholder_for_build'
    }
  });
  
  // Build server
  console.log('Building server...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', {
    stdio: 'inherit'
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}