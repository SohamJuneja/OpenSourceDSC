'use strict';

// Simple Test Framework without external dependencies
const TestFramework = {
  tests: [],
  passedTests: 0,
  failedTests: 0,
  skippedTests: 0,
  
  // Add a test case
  test: function(name, fn, skip = false) {
    this.tests.push({ name, fn, skip });
    return this;
  },
  
  // Assertions
  assert: {
    equal: function(actual, expected, message) {
      if (actual === expected) {
        return { passed: true, message: message || `Expected ${expected} and got ${actual}` };
      }
      return { 
        passed: false, 
        message: message || `Expected ${expected} but got ${actual}` 
      };
    },
    
    notEqual: function(actual, expected, message) {
      if (actual !== expected) {
        return { passed: true, message: message || `Expected not to be ${expected} and got ${actual}` };
      }
      return { 
        passed: false, 
        message: message || `Expected to not be ${expected} but got ${actual}` 
      };
    },
    
    true: function(value, message) {
      return this.equal(value, true, message);
    },
    
    false: function(value, message) {
      return this.equal(value, false, message);
    },
    
    contains: function(array, value, message) {
      if (array && array.includes(value)) {
        return { passed: true, message: message || `Array contains ${value}` };
      }
      return { 
        passed: false, 
        message: message || `Expected array to contain ${value}` 
      };
    },
    
    throws: function(fn, message) {
      try {
        fn();
        return { passed: false, message: message || 'Expected function to throw but it did not' };
      } catch (e) {
        return { passed: true, message: message || 'Function threw error as expected' };
      }
    },
    
    doesNotThrow: function(fn, message) {
      try {
        fn();
        return { passed: true, message: message || 'Function did not throw as expected' };
      } catch (e) {
        return { 
          passed: false, 
          message: message || `Expected function to not throw but it threw: ${e.message}` 
        };
      }
    },
    
    isType: function(value, type, message) {
      const actualType = typeof value;
      if (actualType === type) {
        return { passed: true, message: message || `Value is of type ${type}` };
      }
      return { 
        passed: false, 
        message: message || `Expected type ${type} but got ${actualType}` 
      };
    }
  },
  
  // Run all tests
  run: function() {
    console.log('\n📋 RUNNING TESTS...\n');
    
    this.passedTests = 0;
    this.failedTests = 0;
    this.skippedTests = 0;
    
    const startTime = performance.now();
    
    for (const test of this.tests) {
      if (test.skip) {
        console.log(`⏭️ SKIPPED: ${test.name}`);
        this.skippedTests++;
        continue;
      }
      
      try {
        const result = test.fn(this.assert);
        if (result && result.passed === false) {
          console.log(`❌ FAILED: ${test.name} - ${result.message}`);
          this.failedTests++;
        } else {
          console.log(`✅ PASSED: ${test.name}`);
          this.passedTests++;
        }
      } catch (error) {
        console.log(`❌ ERROR: ${test.name} - ${error.message}`);
        console.error(error);
        this.failedTests++;
      }
    }
    
    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n📊 TEST SUMMARY:');
    console.log(`✅ Passed: ${this.passedTests}`);
    console.log(`❌ Failed: ${this.failedTests}`);
    console.log(`⏭️ Skipped: ${this.skippedTests}`);
    console.log(`⏱️ Duration: ${duration}s`);
    
    return {
      passed: this.passedTests,
      failed: this.failedTests,
      skipped: this.skippedTests,
      total: this.tests.length,
      duration: duration
    };
  },
  
  // Reset the framework for another run
  reset: function() {
    this.tests = [];
    this.passedTests = 0;
    this.failedTests = 0;
    this.skippedTests = 0;
    return this;
  }
};

// Export for browser or Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TestFramework;
} else {
  window.TestFramework = TestFramework;
} 