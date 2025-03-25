'use strict';

// Test Runner - Executes all test suites

// Import test modules
const TestFramework = {
  _tests: [],
  test: function(name, testFn) {
    this._tests.push({ name, testFn });
    return this;
  },
  run: function() {
    console.log('Running tests...');
    let passed = 0;
    let failed = 0;
    
    this._tests.forEach(test => {
      const assert = {
        equal: function(actual, expected, message) {
          if (actual === expected) {
            return { passed: true, message: `PASS: ${message || 'Values are equal'}` };
          } else {
            return { 
              passed: false, 
              message: `FAIL: ${message || 'Values are not equal'} - Expected ${expected}, got ${actual}` 
            };
          }
        },
        true: function(value, message) {
          if (value === true) {
            return { passed: true, message: `PASS: ${message || 'Value is true'}` };
          } else {
            return { 
              passed: false, 
              message: `FAIL: ${message || 'Value is not true'} - Got ${value}` 
            };
          }
        },
        false: function(value, message) {
          if (value === false) {
            return { passed: true, message: `PASS: ${message || 'Value is false'}` };
          } else {
            return { 
              passed: false, 
              message: `FAIL: ${message || 'Value is not false'} - Got ${value}` 
            };
          }
        }
      };
      
      try {
        const result = test.testFn(assert);
        if (result && result.passed === false) {
          console.log(`❌ ${test.name}: ${result.message}`);
          failed++;
        } else {
          console.log(`✓ ${test.name}`);
          passed++;
        }
      } catch (error) {
        console.log(`❌ ${test.name}: ${error.message}`);
        failed++;
      }
    });
    
    console.log(`Completed: ${passed} passed, ${failed} failed`);
    
    // Clear tests for next run
    this._tests = [];
    
    return this;
  }
};

// Function to run all test suites
function runAllTests() {
  // Define global TestFramework
  window.TestFramework = TestFramework;
  
  // Run each test suite
  console.log('=== Gallery Tests ===');
  runGalleryTests();
  
  console.log('\n=== Portfolio Tests ===');
  runPortfolioTests();
  
  console.log('\n=== Testimonials Tests ===');
  runTestimonialsTests();
  
  console.log('\n=== Theme Tests ===');
  runThemeTests();
  
  console.log('\n=== All tests completed ===');
}

// Execute tests when running in a browser
if (typeof window !== 'undefined') {
  // Add run button to the page if in browser
  window.onload = function() {
    const runButton = document.createElement('button');
    runButton.textContent = 'Run Tests';
    runButton.style.position = 'fixed';
    runButton.style.top = '10px';
    runButton.style.right = '10px';
    runButton.style.zIndex = '9999';
    runButton.style.padding = '10px';
    runButton.style.background = '#4CAF50';
    runButton.style.color = 'white';
    runButton.style.border = 'none';
    runButton.style.borderRadius = '4px';
    runButton.style.cursor = 'pointer';
    
    runButton.addEventListener('click', function() {
      const resultsDiv = document.createElement('div');
      resultsDiv.id = 'test-results';
      resultsDiv.style.position = 'fixed';
      resultsDiv.style.top = '50px';
      resultsDiv.style.right = '10px';
      resultsDiv.style.width = '400px';
      resultsDiv.style.maxHeight = '80vh';
      resultsDiv.style.overflowY = 'auto';
      resultsDiv.style.background = '#f8f8f8';
      resultsDiv.style.border = '1px solid #ddd';
      resultsDiv.style.borderRadius = '4px';
      resultsDiv.style.padding = '15px';
      resultsDiv.style.zIndex = '9998';
      resultsDiv.style.fontFamily = 'monospace';
      
      document.body.appendChild(resultsDiv);
      
      // Redirect console.log to the results div
      const originalConsoleLog = console.log;
      console.log = function(message) {
        originalConsoleLog.apply(console, arguments);
        const logLine = document.createElement('div');
        logLine.textContent = message;
        
        if (message.includes('❌')) {
          logLine.style.color = 'red';
        } else if (message.includes('✓')) {
          logLine.style.color = 'green';
        } else if (message.includes('===')) {
          logLine.style.fontWeight = 'bold';
          logLine.style.marginTop = '10px';
        }
        
        resultsDiv.appendChild(logLine);
      };
      
      // Run the tests
      runAllTests();
      
      // Restore console.log
      console.log = originalConsoleLog;
      
      // Add close button
      const closeButton = document.createElement('button');
      closeButton.textContent = 'X';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '5px';
      closeButton.style.right = '5px';
      closeButton.style.background = '#f44336';
      closeButton.style.color = 'white';
      closeButton.style.border = 'none';
      closeButton.style.borderRadius = '50%';
      closeButton.style.width = '24px';
      closeButton.style.height = '24px';
      closeButton.style.cursor = 'pointer';
      closeButton.style.fontSize = '12px';
      
      closeButton.addEventListener('click', function() {
        document.body.removeChild(resultsDiv);
      });
      
      resultsDiv.appendChild(closeButton);
    });
    
    document.body.appendChild(runButton);
  };
}

// Export for Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TestFramework, runAllTests };
} 