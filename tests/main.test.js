'use strict';

// Tests for main.js
function runMainTests() {
  // Create a mock DOM for testing
  setupMockDOM();
  
  return TestFramework
    // Test toggleMenu function
    .test('toggleMenu should toggle display style between block and none', function(assert) {
      // Setup
      const navMenu = document.createElement('div');
      navMenu.style.display = 'none';
      window.navMenu = navMenu;
      
      // First call should set display to block
      toggleMenu();
      const result1 = assert.equal(navMenu.style.display, 'block');
      if (!result1.passed) return result1;
      
      // Second call should set display to none
      toggleMenu();
      return assert.equal(navMenu.style.display, 'none');
    })
    
    // Test validateForm function
    .test('validateForm should return false for empty name', function(assert) {
      // Setup mock form elements
      const nameInput = document.createElement('input');
      nameInput.value = '';
      const emailInput = document.createElement('input');
      emailInput.value = 'test@example.com';
      const messageInput = document.createElement('input');
      messageInput.value = 'Hello';
      
      document.getElementById = function(id) {
        if (id === 'name') return nameInput;
        if (id === 'email') return emailInput;
        if (id === 'message') return messageInput;
        return null;
      };
      
      // Override alert to prevent it from showing during tests
      const originalAlert = window.alert;
      window.alert = function() {};
      
      // Test validation
      const result = validateForm();
      
      // Restore original alert
      window.alert = originalAlert;
      
      return assert.false(result, 'validateForm should return false for empty name');
    })
    
    .test('validateForm should return false for invalid email', function(assert) {
      // Setup mock form elements
      const nameInput = document.createElement('input');
      nameInput.value = 'Test User';
      const emailInput = document.createElement('input');
      emailInput.value = 'invalid-email';
      const messageInput = document.createElement('input');
      messageInput.value = 'Hello';
      
      document.getElementById = function(id) {
        if (id === 'name') return nameInput;
        if (id === 'email') return emailInput;
        if (id === 'message') return messageInput;
        return null;
      };
      
      // Override alert to prevent it from showing during tests
      const originalAlert = window.alert;
      window.alert = function() {};
      
      // Test validation
      const result = validateForm();
      
      // Restore original alert
      window.alert = originalAlert;
      
      return assert.false(result, 'validateForm should return false for invalid email');
    })
    
    .test('validateForm should return true for valid form data', function(assert) {
      // Setup mock form elements
      const nameInput = document.createElement('input');
      nameInput.value = 'Test User';
      const emailInput = document.createElement('input');
      emailInput.value = 'test@example.com';
      const messageInput = document.createElement('input');
      messageInput.value = 'Hello World';
      
      document.getElementById = function(id) {
        if (id === 'name') return nameInput;
        if (id === 'email') return emailInput;
        if (id === 'message') return messageInput;
        return null;
      };
      
      // Test validation
      const result = validateForm();
      
      return assert.true(result, 'validateForm should return true for valid form data');
    })
    
    // Test toggleDarkMode function
    .test('toggleDarkMode should toggle dark-mode class on body', function(assert) {
      // Setup
      document.body.className = '';
      window.darkModeToggle = document.createElement('button');
      
      // First call should add the class
      toggleDarkMode();
      const result1 = assert.true(document.body.classList.contains('dark-mode'));
      if (!result1.passed) return result1;
      
      // Second call should remove the class
      toggleDarkMode();
      return assert.false(document.body.classList.contains('dark-mode'));
    })
    
    // Test loadGalleryImages function
    .test('loadGalleryImages should create gallery items', function(assert) {
      // Setup
      const galleryContainer = document.createElement('div');
      galleryContainer.className = 'gallery-container';
      document.querySelector = function() {
        return galleryContainer;
      };
      
      document.createElement = function(tag) {
        const element = originalCreateElement(tag);
        // Make sure addEventListener is available
        element.addEventListener = function(event, callback) {
          element[event] = callback;
        };
        return element;
      };
      
      // Call the function
      loadGalleryImages();
      
      // Should create gallery items
      return assert.true(galleryContainer.children.length > 0, 'Gallery container should contain items');
    })
    
    // Test register function
    .test('register function should exist', function(assert) {
      return assert.isType(register, 'function', 'register should be a function');
    })
    
    // Test startCountdown function
    .test('startCountdown should update countdown element', function(assert) {
      // Setup
      const countdownElement = document.createElement('div');
      document.getElementById = function(id) {
        if (id === 'countdown') return countdownElement;
        return null;
      };
      
      // Mock the setInterval function to execute callback immediately
      const originalSetInterval = window.setInterval;
      window.setInterval = function(callback) {
        callback();
        return 1; // Return a dummy interval ID
      };
      
      // Call the function
      startCountdown();
      
      // Restore original setInterval
      window.setInterval = originalSetInterval;
      
      // Should have updated the countdown element
      return assert.true(countdownElement.innerHTML !== '', 'Countdown element should be updated');
    })
    
    .run();
}

// Helper function to setup mock DOM for tests
function setupMockDOM() {
  // Create mock document and window if they don't exist
  if (typeof window === 'undefined') {
    global.window = {};
  }
  
  if (typeof document === 'undefined') {
    global.document = {};
  }
  
  // Mock document elements and methods
  document.body = document.body || {
    classList: {
      add: function(className) {
        if (!this.className) this.className = '';
        this.className += ' ' + className;
      },
      remove: function(className) {
        if (!this.className) return;
        this.className = this.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
      },
      contains: function(className) {
        if (!this.className) return false;
        return this.className.indexOf(className) !== -1;
      }
    }
  };
  
  // Save original document.createElement to use in our mock
  const originalCreateElement = document.createElement;
  document.createElement = document.createElement || function(tag) {
    return {
      style: {},
      className: '',
      innerHTML: '',
      appendChild: function(child) {
        if (!this.children) this.children = [];
        this.children.push(child);
      },
      classList: {
        add: function(className) {
          if (!this.className) this.className = '';
          this.className += ' ' + className;
        },
        remove: function(className) {
          if (!this.className) return;
          this.className = this.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
        },
        contains: function(className) {
          if (!this.className) return false;
          return this.className.indexOf(className) !== -1;
        }
      }
    };
  };
  
  // Mock other methods
  document.querySelector = document.querySelector || function() { return null; };
  document.querySelectorAll = document.querySelectorAll || function() { return []; };
  document.getElementById = document.getElementById || function() { return null; };
  
  window.alert = window.alert || function() {};
  window.setInterval = window.setInterval || function() { return 0; };
} 