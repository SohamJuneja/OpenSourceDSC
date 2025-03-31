/**
 * Command-line test runner
 * Run with: node run-tests.js
 */

// Load test utilities
const { TestSuite, assert } = require('./test-utils');

// Create a minimal DOM environment for testing
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

// Load source files to test
// You'll need to adjust these paths based on your actual file structure
try {
  require('../js/main.js');
} catch (e) {
  console.log('Warning: Could not load ../js/main.js', e.message);
}

try {
  require('../portfolio/script.js');
} catch (e) {
  console.log('Warning: Could not load ../portfolio/script.js', e.message);
}

// Load and run tests
const { runJsTests } = require('./js-tests');
const { runPortfolioTests } = require('./portfolio-tests');

console.log('=== Running all tests ===\n');

runJsTests();
console.log('\n');
runPortfolioTests();