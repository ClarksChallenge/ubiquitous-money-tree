/**
 * Test Suite for ubiquitous-money-tree
 * Validates HTML structure, script integrity, and deployment readiness
 */

const fs = require('fs');
const path = require('path');

const TESTS = [];
let PASSED = 0;
let FAILED = 0;

// Test helper
function test(name, fn) {
  TESTS.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// ============================================
// TEST SUITE
// ============================================

test('HTML file exists', () => {
  const indexPath = path.join(__dirname, '../index.html');
  assert(fs.existsSync(indexPath), 'index.html not found');
});

test('HTML contains required elements', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert(html.includes('<!DOCTYPE html>'), 'Missing DOCTYPE');
  assert(html.includes('<title>Survey-to-Donate Platform</title>'), 'Missing title tag');
  assert(html.includes('id="pollfish-container"'), 'Missing pollfish-container div');
});

test('HTML has valid meta tags', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert(html.includes('charset="UTF-8"'), 'Missing charset meta tag');
  assert(html.includes('viewport'), 'Missing viewport meta tag');
});

test('URL parameter parsing is present', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert(html.includes('URLSearchParams'), 'URL parameter parsing missing');
  assert(html.includes("urlParams.get('id')"), 'Creator ID parameter parsing missing');
});

test('Pollfish config object exists', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert(html.includes('pollfishConfig'), 'Pollfish configuration missing');
  assert(html.includes('api_key'), 'Pollfish API key field missing');
  assert(html.includes('container: "pollfish-container"'), 'Pollfish container config missing');
});

test('No critical console errors expected', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  // Check for common issues
  assert(!html.includes('console.error'), 'Found error logging in production code');
  assert(!html.includes('debugger'), 'Found debugger statement');
});

test('CSS styling is present', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert(html.includes('<style>'), 'No CSS styling found');
  assert(html.includes('font-family'), 'CSS font styling missing');
});

test('Footer contains privacy notice', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert(html.includes('Privacy Notice'), 'Privacy notice missing from footer');
  assert(html.includes('80%'), 'Revenue split information missing');
});

test('jQuery and Pollfish scripts referenced', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert(html.includes('<script'), 'No script tags found');
  // Count script tags
  const scriptCount = (html.match(/<script/g) || []).length;
  assert(scriptCount >= 2, `Expected at least 2 script blocks, found ${scriptCount}`);
});

test('README documentation exists', () => {
  const readmePath = path.join(__dirname, '../README.md');
  assert(fs.existsSync(readmePath), 'README.md not found');
  const readme = fs.readFileSync(readmePath, 'utf8');
  assert(readme.length > 100, 'README.md is too short or empty');
});

// ============================================
// RUN TESTS
// ============================================

console.log('\n🧪 Running Test Suite for ubiquitous-money-tree\n');
console.log('=' .repeat(50));

TESTS.forEach(({ name, fn }, index) => {
  try {
    fn();
    console.log(`✅ [${index + 1}/${TESTS.length}] ${name}`);
    PASSED++;
  } catch (error) {
    console.log(`❌ [${index + 1}/${TESTS.length}] ${name}`);
    console.log(`   Error: ${error.message}`);
    FAILED++;
  }
});

console.log('=' .repeat(50));
console.log(`\n📊 Results: ${PASSED} passed, ${FAILED} failed out of ${TESTS.length} tests\n`);

if (FAILED > 0) {
  console.log('⚠️  DEPLOYMENT BLOCKED: Fix the failures above before deploying.\n');
  process.exit(1);
} else {
  console.log('✨ All tests passed! Ready for deployment.\n');
  process.exit(0);
}
