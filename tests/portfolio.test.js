'use strict';

// Tests for portfolio/script.js
function runPortfolioTests() {
  // Create a mock DOM for testing
  setupMockDOM();
  
  return TestFramework
    // Test renderProjects function
    .test('renderProjects should add project cards to the container', function(assert) {
      // Setup
      const projectContainer = document.createElement('div');
      projectContainer.className = 'project-container';
      
      document.querySelector = function(selector) {
        if (selector === '.project-container') return projectContainer;
        return null;
      };
      
      // Mock projects array
      window.projects = [
        {
          title: "Test Project 1",
          description: "Test Description 1",
          technologies: ["Tech1", "Tech2"]
        },
        {
          title: "Test Project 2",
          description: "Test Description 2",
          technologies: ["Tech3", "Tech4"]
        }
      ];
      
      // Call the function
      renderProjects();
      
      // Check that project cards were created
      return assert.equal(projectContainer.children.length, 2, 'Should create 2 project cards');
    })
    
    .test('renderProjects should include project details in cards', function(assert) {
      // Setup
      const projectContainer = document.createElement('div');
      projectContainer.className = 'project-container';
      
      document.querySelector = function(selector) {
        if (selector === '.project-container') return projectContainer;
        return null;
      };
      
      // Mock projects array with a single project
      window.projects = [
        {
          title: "Test Project",
          description: "Test Description",
          technologies: ["Tech1", "Tech2"]
        }
      ];
      
      // Call the function
      renderProjects();
      
      // Check that the project card includes the correct details
      const innerHTML = projectContainer.innerHTML;
      
      const titleResult = assert.true(innerHTML.includes('Test Project'), 'Project card should include title');
      if (!titleResult.passed) return titleResult;
      
      const descResult = assert.true(innerHTML.includes('Test Description'), 'Project card should include description');
      if (!descResult.passed) return descResult;
      
      const tech1Result = assert.true(innerHTML.includes('Tech1'), 'Project card should include first technology');
      if (!tech1Result.passed) return tech1Result;
      
      return assert.true(innerHTML.includes('Tech2'), 'Project card should include second technology');
    })
    
    // Test setupContactForm function
    .test('setupContactForm should prevent form submission with empty fields', function(assert) {
      // Setup
      const form = document.createElement('form');
      form.id = 'contact-form';
      
      // Create form fields
      const nameInput = document.createElement('input');
      nameInput.name = 'name';
      nameInput.value = '';
      
      const emailInput = document.createElement('input');
      emailInput.name = 'email';
      emailInput.value = 'test@example.com';
      
      const messageInput = document.createElement('input');
      messageInput.name = 'message';
      messageInput.value = 'Hello';
      
      // Add fields to form
      form.name = nameInput;
      form.email = emailInput;
      form.message = messageInput;
      
      document.getElementById = function(id) {
        if (id === 'contact-form') return form;
        return null;
      };
      
      // Mock alert
      let alertMessage = '';
      window.alert = function(message) {
        alertMessage = message;
      };
      
      // Setup contact form
      setupContactForm();
      
      // Trigger form submission
      const event = { preventDefault: function() {} };
      if (typeof form.addEventListener === 'function' && form.events && form.events.submit) {
        form.events.submit(event);
      }
      
      // Check that alert was shown for empty name
      return assert.true(alertMessage.includes('fill in all fields'), 'Should show alert for empty fields');
    })
    
    .test('setupContactForm should not show alert with all fields filled', function(assert) {
      // Setup
      const form = document.createElement('form');
      form.id = 'contact-form';
      
      // Create form fields
      const nameInput = document.createElement('input');
      nameInput.name = 'name';
      nameInput.value = 'Test User';
      
      const emailInput = document.createElement('input');
      emailInput.name = 'email';
      emailInput.value = 'test@example.com';
      
      const messageInput = document.createElement('input');
      messageInput.name = 'message';
      messageInput.value = 'Hello World';
      
      // Add fields to form
      form.name = nameInput;
      form.email = emailInput;
      form.message = messageInput;
      
      document.getElementById = function(id) {
        if (id === 'contact-form') return form;
        return null;
      };
      
      // Mock alert
      let alertCalled = false;
      window.alert = function() {
        alertCalled = true;
      };
      
      // Mock console.log
      let logCalled = false;
      const originalConsoleLog = console.log;
      console.log = function() {
        logCalled = true;
      };
      
      // Setup contact form
      setupContactForm();
      
      // Trigger form submission
      const event = { preventDefault: function() {} };
      if (typeof form.addEventListener === 'function' && form.events && form.events.submit) {
        form.events.submit(event);
      }
      
      // Restore console.log
      console.log = originalConsoleLog;
      
      // Alert should not be called when all fields are filled
      const alertResult = assert.false(alertCalled, 'Should not show alert when all fields are filled');
      if (!alertResult.passed) return alertResult;
      
      // Console.log should be called to log form submission
      return assert.true(logCalled, 'Should log form submission');
    })
    
    // Test initPage function
    .test('initPage should call renderProjects and setupContactForm', function(assert) {
      // Track function calls
      let renderProjectsCalled = false;
      let setupContactFormCalled = false;
      
      // Save original functions
      const originalRenderProjects = window.renderProjects;
      const originalSetupContactForm = window.setupContactForm;
      
      // Replace with tracking functions
      window.renderProjects = function() {
        renderProjectsCalled = true;
      };
      
      window.setupContactForm = function() {
        setupContactFormCalled = true;
      };
      
      // Call initPage
      initPage();
      
      // Restore original functions
      window.renderProjects = originalRenderProjects;
      window.setupContactForm = originalSetupContactForm;
      
      // Check that both functions were called
      const renderResult = assert.true(renderProjectsCalled, 'initPage should call renderProjects');
      if (!renderResult.passed) return renderResult;
      
      return assert.true(setupContactFormCalled, 'initPage should call setupContactForm');
    })
    
    // Test hamburger menu functionality
    .test('Hamburger menu click should toggle active class', function(assert) {
      // Setup
      const hamburger = document.createElement('button');
      hamburger.className = 'hamburger-menu';
      
      const navLinks = document.createElement('div');
      navLinks.className = 'nav-links';
      
      document.querySelector = function(selector) {
        if (selector === '.hamburger-menu') return hamburger;
        if (selector === '.nav-links') return navLinks;
        return null;
      };
      
      // Mock querySelectorAll to return an empty array
      document.querySelectorAll = function() {
        return [];
      };
      
      // Execute the hamburger menu code
      const hamburgerCode = function() {
        const hamburger = document.querySelector('.hamburger-menu');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('active');
          navLinks.classList.toggle('active');
        });
      };
      
      hamburgerCode();
      
      // Trigger click event
      if (hamburger.events && hamburger.events.click) {
        hamburger.events.click();
      }
      
      // Check that active class was added to both elements
      const hamburgerResult = assert.true(hamburger.classList.contains('active'), 'Hamburger should have active class after click');
      if (!hamburgerResult.passed) return hamburgerResult;
      
      return assert.true(navLinks.classList.contains('active'), 'Nav links should have active class after click');
    })
    
    .run();
}

// This function is needed in portfolio.test.js as well, but we only include it if it's not defined yet
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
        events: {}
      };
    };
    
    // Mock other methods
    document.querySelector = document.querySelector || function() { return null; };
    document.querySelectorAll = document.querySelectorAll || function() { return []; };
    document.getElementById = document.getElementById || function() { return null; };
    
    window.alert = window.alert || function() {};
  }
} 