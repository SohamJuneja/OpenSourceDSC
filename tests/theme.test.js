'use strict';

// Tests for theme.js
function runThemeTests() {
  // Create a mock DOM for testing
  setupMockDOM();
  
  return TestFramework
    // Test toggleTheme function
    .test('toggleTheme should switch between light and dark themes', function(assert) {
      // Setup
      document.body.className = '';
      
      // Call toggleTheme to switch to dark
      toggleTheme();
      
      // Check that dark theme is applied
      const darkResult = assert.true(document.body.classList.contains('dark-theme'), 'toggleTheme should add dark-theme class');
      if (!darkResult.passed) return darkResult;
      
      // Call toggleTheme again to switch back to light
      toggleTheme();
      
      // Check that dark theme is removed
      return assert.false(document.body.classList.contains('dark-theme'), 'toggleTheme should remove dark-theme class when called again');
    })
    
    .test('toggleTheme should update localStorage with the current theme', function(assert) {
      // Setup
      document.body.className = '';
      let storedTheme = null;
      
      // Mock localStorage
      window.localStorage = {
        getItem: function(key) {
          if (key === 'theme') return storedTheme;
          return null;
        },
        setItem: function(key, value) {
          if (key === 'theme') storedTheme = value;
        }
      };
      
      // Call toggleTheme to switch to dark
      toggleTheme();
      
      // Check that dark theme is stored
      const darkResult = assert.equal(storedTheme, 'dark', 'Dark theme should be stored in localStorage');
      if (!darkResult.passed) return darkResult;
      
      // Call toggleTheme again to switch back to light
      toggleTheme();
      
      // Check that light theme is stored
      return assert.equal(storedTheme, 'light', 'Light theme should be stored in localStorage');
    })
    
    // Test loadTheme function
    .test('loadTheme should apply theme from localStorage', function(assert) {
      // Setup
      document.body.className = '';
      let storedTheme = 'dark';
      
      // Mock localStorage
      window.localStorage = {
        getItem: function(key) {
          if (key === 'theme') return storedTheme;
          return null;
        },
        setItem: function() {}
      };
      
      // Call loadTheme
      loadTheme();
      
      // Check that dark theme is applied from localStorage
      const darkResult = assert.true(document.body.classList.contains('dark-theme'), 'Dark theme should be applied from localStorage');
      if (!darkResult.passed) return darkResult;
      
      // Change stored theme and load again
      storedTheme = 'light';
      loadTheme();
      
      // Check that dark theme is removed when light theme is stored
      return assert.false(document.body.classList.contains('dark-theme'), 'Dark theme should be removed when light theme is stored');
    })
    
    .test('loadTheme should default to system preference if no theme in localStorage', function(assert) {
      // Setup
      document.body.className = '';
      
      // Mock localStorage with no theme stored
      window.localStorage = {
        getItem: function() { return null; },
        setItem: function() {}
      };
      
      // Mock system preference for dark mode
      window.matchMedia = function(query) {
        if (query === '(prefers-color-scheme: dark)') {
          return { matches: true };
        }
        return { matches: false };
      };
      
      // Call loadTheme
      loadTheme();
      
      // Check that dark theme is applied based on system preference
      const darkResult = assert.true(document.body.classList.contains('dark-theme'), 'Dark theme should be applied based on system preference');
      if (!darkResult.passed) return darkResult;
      
      // Change system preference to light
      window.matchMedia = function(query) {
        if (query === '(prefers-color-scheme: dark)') {
          return { matches: false };
        }
        return { matches: false };
      };
      
      // Call loadTheme again
      loadTheme();
      
      // Check that dark theme is not applied when system prefers light
      return assert.false(document.body.classList.contains('dark-theme'), 'Dark theme should not be applied when system prefers light');
    })
    
    // Test theme toggle button
    .test('Theme toggle button should call toggleTheme when clicked', function(assert) {
      // Setup
      document.body.className = '';
      const themeToggle = document.createElement('button');
      themeToggle.id = 'theme-toggle';
      
      document.getElementById = function(id) {
        if (id === 'theme-toggle') return themeToggle;
        return null;
      };
      
      // Track if toggleTheme was called
      let toggleThemeCalled = false;
      window.toggleTheme = function() {
        toggleThemeCalled = true;
      };
      
      // Call setupThemeToggle
      setupThemeToggle();
      
      // Trigger click event
      if (themeToggle.events && themeToggle.events.click) {
        themeToggle.events.click();
      }
      
      // Check that toggleTheme was called
      return assert.true(toggleThemeCalled, 'toggleTheme should be called when theme toggle button is clicked');
    })
    
    .test('setupThemeToggle should attach an event listener to the theme toggle button', function(assert) {
      // Setup
      const themeToggle = document.createElement('button');
      themeToggle.id = 'theme-toggle';
      
      document.getElementById = function(id) {
        if (id === 'theme-toggle') return themeToggle;
        return null;
      };
      
      // Call setupThemeToggle
      setupThemeToggle();
      
      // Check that a click event listener was attached
      return assert.true(typeof themeToggle.events === 'object' && typeof themeToggle.events.click === 'function', 'Click event listener should be attached to theme toggle button');
    })
    
    .run();
}

// This function is needed in theme.test.js as well, but we only include it if it's not defined yet
if (typeof setupMockDOM !== 'function') {
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
      className: '',
      classList: {
        add: function(className) {
          if (!document.body.className) document.body.className = '';
          document.body.className += ' ' + className;
        },
        remove: function(className) {
          if (!document.body.className) return;
          document.body.className = document.body.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
        },
        contains: function(className) {
          if (!document.body.className) return false;
          return document.body.className.indexOf(className) !== -1;
        },
        toggle: function(className) {
          if (this.contains(className)) {
            this.remove(className);
          } else {
            this.add(className);
          }
        }
      }
    };
    
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
          },
          toggle: function(className) {
            if (this.contains(className)) {
              this.remove(className);
            } else {
              this.add(className);
            }
          }
        },
        events: {},
        addEventListener: function(event, handler) {
          if (!this.events) this.events = {};
          this.events[event] = handler;
        }
      };
    };
    
    // Mock other methods
    document.querySelector = document.querySelector || function() { return null; };
    document.querySelectorAll = document.querySelectorAll || function() { return []; };
    document.getElementById = document.getElementById || function() { return null; };
    
    // Mock localStorage
    if (!window.localStorage) {
      window.localStorage = {
        getItem: function() { return null; },
        setItem: function() {}
      };
    }
    
    // Mock matchMedia
    if (!window.matchMedia) {
      window.matchMedia = function() { return { matches: false }; };
    }
  }
} 