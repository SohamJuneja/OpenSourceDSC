/**
 * Simple JavaScript testing utility
 */

// Test suite container
const TestSuite = {
  tests: [],
  
  // Add a test to the suite
  test: function(name, testFn) {
    this.tests.push({ name, testFn });
    return this;
  },
  
  // Run all tests in the suite
  run: function() {
    console.log(`Running ${this.tests.length} tests...`);
    console.log('----------------------------');
    
    let passed = 0;
    let failed = 0;
    
    this.tests.forEach((test, index) => {
      try {
        test.testFn();
        console.log(`✅ PASS: ${test.name}`);
        passed++;
      } catch (error) {
        console.error(`❌ FAIL: ${test.name}`);
        console.error(`   Error: ${error.message}`);
        failed++;
      }
    });
    
    console.log('----------------------------');
    console.log(`Results: ${passed} passed, ${failed} failed`);
    return { passed, failed };
  }
};

// Assertion functions
const assert = {
  equal: function(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${expected}, but got ${actual}`);
    }
  },
  
  deepEqual: function(actual, expected, message) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    
    if (actualStr !== expectedStr) {
      throw new Error(message || `Expected ${expectedStr}, but got ${actualStr}`);
    }
  },
  
  true: function(value, message) {
    if (value !== true) {
      throw new Error(message || `Expected true, but got ${value}`);
    }
  },
  
  false: function(value, message) {
    if (value !== false) {
      throw new Error(message || `Expected false, but got ${value}`);
    }
  },
  
  throws: function(fn, message) {
    try {
      fn();
      throw new Error(message || "Expected function to throw an error, but it didn't");
    } catch (e) {
      // Test passes if function throws
      return;
    }
  }
};

// Export the testing utilities
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TestSuite, assert };
}