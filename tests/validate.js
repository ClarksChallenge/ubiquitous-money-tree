/**
 * Pre-deployment validation script
 * Checks for deployment blockers and configuration issues
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Pre-Deployment Validation\n');
console.log('=' .repeat(50));

const issues = [];
const warnings = [];

// Check 1: Placeholder API Key
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
if (html.includes('YOUR_POLLFISH_PUBLISHER_API_KEY_HERE')) {
  issues.push('❌ BLOCKING: Pollfish API key is still a placeholder. Replace with real key before deploying.');
}

// Check 2: jQuery URL
if (html.includes('https://jquery.com')) {
  warnings.push('⚠️  jQuery URL appears incomplete. Verify the CDN link is correct: should be like https://code.jquery.com/jquery-3.6.0.min.js');
}

// Check 3: Pollfish script URL
if (html.includes('https://googleapis.com')) {
  warnings.push('⚠️  Pollfish script URL appears incomplete. Should be the actual Pollfish SDK URL.');
}

// Check 4: Debug mode
if (html.includes('debug: true')) {
  warnings.push('⚠️  Pollfish debug mode is enabled. Change to `debug: false` before production deployment.');
}

// Check 5: Environment file
if (!fs.existsSync(path.join(__dirname, '../.env'))) {
  warnings.push('ℹ️  No .env file found. Consider using environment variables for API keys.');
}

// Display results
if (issues.length > 0) {
  console.log('\n🚫 DEPLOYMENT BLOCKERS:\n');
  issues.forEach(issue => console.log(`  ${issue}`));
}

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:\n');
  warnings.forEach(warning => console.log(`  ${warning}`));
}

if (issues.length === 0) {
  console.log('\n✅ No blocking issues found.');
  console.log('   (Review warnings above before production deployment)\n');
  console.log('=' .repeat(50));
  console.log('\n🚀 Ready for deployment!\n');
  process.exit(0);
} else {
  console.log('\n' + '=' .repeat(50));
  console.log('\n❌ Cannot deploy: Fix blocking issues first.\n');
  process.exit(1);
}
