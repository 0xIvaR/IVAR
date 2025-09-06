#!/usr/bin/env node

/**
 * IVAR Build Script
 * Optimizes and builds the application for production
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 IVAR Production Build')
console.log('========================')

// Clean previous build
console.log('🧹 Cleaning previous build...')
const distPath = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true })
  console.log('✅ Previous build cleaned')
}

// Run build
console.log('📦 Building application...')
try {
  execSync('npm run build', { stdio: 'inherit' })
  console.log('✅ Build completed successfully')
} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
}

// Check build size
const buildStats = fs.statSync(path.join(distPath, 'index.html'))
console.log(`📊 Build size: ${(buildStats.size / 1024).toFixed(2)} KB`)

// Create deployment info
const deployInfo = {
  buildDate: new Date().toISOString(),
  version: require('../package.json').version,
  nodeVersion: process.version,
  buildSize: buildStats.size
}

fs.writeFileSync(
  path.join(distPath, 'build-info.json'), 
  JSON.stringify(deployInfo, null, 2)
)

console.log('\n🎉 Build ready for deployment!')
console.log('📁 Build location: /dist')
console.log('📊 Build info: /dist/build-info.json')
console.log('\n📋 Deployment options:')
console.log('1. Upload /dist folder to web server')
console.log('2. Use: npm run preview (for testing)')
console.log('3. Deploy to Vercel/Netlify/GitHub Pages')
