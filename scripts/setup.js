#!/usr/bin/env node

/**
 * IVAR Development Setup Script
 * Automates the setup process for development environment
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🤖 IVAR Development Setup')
console.log('========================')

// Check Node.js version
const nodeVersion = process.version
console.log(`📦 Node.js version: ${nodeVersion}`)

if (parseInt(nodeVersion.slice(1)) < 18) {
  console.error('❌ Node.js 18 or higher is required')
  process.exit(1)
}

// Install dependencies
console.log('📥 Installing dependencies...')
try {
  execSync('npm install', { stdio: 'inherit' })
  console.log('✅ Dependencies installed successfully')
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message)
  process.exit(1)
}

// Create environment file if it doesn't exist
const envPath = path.join(__dirname, '..', '.env')
const envExamplePath = path.join(__dirname, '..', 'public', 'env.example')

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('📝 Creating .env file from template...')
  fs.copyFileSync(envExamplePath, envPath)
  console.log('✅ .env file created')
  console.log('📝 Please edit .env file with your API keys')
}

// Check if all required directories exist
const requiredDirs = [
  'src/components',
  'src/services', 
  'src/utils',
  'src/styles',
  'public/assets',
  'docs'
]

console.log('📁 Checking directory structure...')
requiredDirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir)
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true })
    console.log(`✅ Created directory: ${dir}`)
  }
})

console.log('\n🎉 Setup complete!')
console.log('\n📋 Next steps:')
console.log('1. Edit .env file with your API keys')
console.log('2. Run: npm run dev')
console.log('3. Open: http://localhost:3000')
console.log('\n🔗 Documentation: /docs/README.md')
console.log('🔗 Examples: /examples/README.md')
