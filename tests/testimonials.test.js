'use strict';

// Tests for testimonials/script.js
function runTestimonialsTests() {
  // Create a mock DOM for testing
  setupMockDOM();
  
  return TestFramework
    // Test loadTestimonials function
    .test('loadTestimonials should add testimonial cards to the container', function(assert) {
      // Setup
      const testimonialContainer = document.createElement('div');
      testimonialContainer.className = 'testimonial-container';
      
      document.querySelector = function(selector) {
        if (selector === '.testimonial-container') return testimonialContainer;
        return null;
      };
      
      // Mock testimonials array
      window.testimonials = [
        {
          name: "टेस्ट यूजर 1",
          position: "सॉफ्टवेयर डेवलपर",
          message: "बहुत अच्छा काम!",
          image: "user1.jpg"
        },
        {
          name: "टेस्ट यूजर 2",
          position: "प्रोडक्ट मैनेजर",
          message: "शानदार वेबसाइट!",
          image: "user2.jpg"
        }
      ];
      
      // Call the function
      loadTestimonials();
      
      // Check that testimonial cards were created
      return assert.equal(testimonialContainer.children.length, 2, 'Should create 2 testimonial cards');
    })
    
    .test('loadTestimonials should include testimonial details in cards', function(assert) {
      // Setup
      const testimonialContainer = document.createElement('div');
      testimonialContainer.className = 'testimonial-container';
      
      document.querySelector = function(selector) {
        if (selector === '.testimonial-container') return testimonialContainer;
        return null;
      };
      
      // Mock testimonials array with a single testimonial
      window.testimonials = [
        {
          name: "टेस्ट यूजर",
          position: "सॉफ्टवेयर डेवलपर",
          message: "बहुत अच्छा काम!",
          image: "user.jpg"
        }
      ];
      
      // Call the function
      loadTestimonials();
      
      // Check that the testimonial card includes the correct details
      const innerHTML = testimonialContainer.innerHTML;
      
      const nameResult = assert.true(innerHTML.includes('टेस्ट यूजर'), 'Testimonial card should include name');
      if (!nameResult.passed) return nameResult;
      
      const positionResult = assert.true(innerHTML.includes('सॉफ्टवेयर डेवलपर'), 'Testimonial card should include position');
      if (!positionResult.passed) return positionResult;
      
      const messageResult = assert.true(innerHTML.includes('बहुत अच्छा काम!'), 'Testimonial card should include message');
      if (!messageResult.passed) return messageResult;
      
      return assert.true(innerHTML.includes('user.jpg'), 'Testimonial card should include image');
    })
    
    // Test testimonial carousel functionality
    .test('setupTestimonialCarousel should create navigation controls', function(assert) {
      // Setup
      const container = document.createElement('div');
      container.className = 'testimonial-container';
      
      const carouselNav = document.createElement('div');
      carouselNav.className = 'carousel-nav';
      
      document.querySelector = function(selector) {
        if (selector === '.testimonial-container') return container;
        if (selector === '.carousel-nav') return carouselNav;
        return null;
      };
      
      // Mock testimonials array
      window.testimonials = [
        { name: "टेस्ट 1", position: "पद 1", message: "संदेश 1", image: "1.jpg" },
        { name: "टेस्ट 2", position: "पद 2", message: "संदेश 2", image: "2.jpg" },
        { name: "टेस्ट 3", position: "पद 3", message: "संदेश 3", image: "3.jpg" }
      ];
      
      // Call setup function
      setupTestimonialCarousel();
      
      // Check that nav buttons were created
      return assert.equal(carouselNav.children.length, 2, 'Should create 2 navigation buttons (prev/next)');
    })
    
    .test('nextTestimonial should show next testimonial', function(assert) {
      // Setup
      const testimonialContainer = document.createElement('div');
      testimonialContainer.className = 'testimonial-container';
      
      // Create three testimonial cards
      for (let i = 0; i < 3; i++) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.dataset.index = i;
        if (i === 0) card.classList.add('active');
        testimonialContainer.appendChild(card);
      }
      
      document.querySelector = function(selector) {
        if (selector === '.testimonial-container') return testimonialContainer;
        if (selector === '.testimonial-card.active') return testimonialContainer.children[0];
        return null;
      };
      
      document.querySelectorAll = function(selector) {
        if (selector === '.testimonial-card') return Array.from(testimonialContainer.children);
        return [];
      };
      
      // Call next function
      nextTestimonial();
      
      // Check that second card is now active
      const activeIndex = Array.from(testimonialContainer.children).findIndex(card => 
        card.classList.contains('active')
      );
      
      return assert.equal(activeIndex, 1, 'Should activate the second testimonial');
    })
    
    .test('prevTestimonial should show previous testimonial', function(assert) {
      // Setup
      const testimonialContainer = document.createElement('div');
      testimonialContainer.className = 'testimonial-container';
      
      // Create three testimonial cards
      for (let i = 0; i < 3; i++) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.dataset.index = i;
        if (i === 1) card.classList.add('active'); // Start with second card active
        testimonialContainer.appendChild(card);
      }
      
      document.querySelector = function(selector) {
        if (selector === '.testimonial-container') return testimonialContainer;
        if (selector === '.testimonial-card.active') return testimonialContainer.children[1];
        return null;
      };
      
      document.querySelectorAll = function(selector) {
        if (selector === '.testimonial-card') return Array.from(testimonialContainer.children);
        return [];
      };
      
      // Call prev function
      prevTestimonial();
      
      // Check that first card is now active
      const activeIndex = Array.from(testimonialContainer.children).findIndex(card => 
        card.classList.contains('active')
      );
      
      return assert.equal(activeIndex, 0, 'Should activate the first testimonial');
    })
    
    .test('Carousel should loop from last to first testimonial', function(assert) {
      // Setup
      const testimonialContainer = document.createElement('div');
      testimonialContainer.className = 'testimonial-container';
      
      // Create three testimonial cards
      for (let i = 0; i < 3; i++) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.dataset.index = i;
        if (i === 2) card.classList.add('active'); // Start with last card active
        testimonialContainer.appendChild(card);
      }
      
      document.querySelector = function(selector) {
        if (selector === '.testimonial-container') return testimonialContainer;
        if (selector === '.testimonial-card.active') return testimonialContainer.children[2];
        return null;
      };
      
      document.querySelectorAll = function(selector) {
        if (selector === '.testimonial-card') return Array.from(testimonialContainer.children);
        return [];
      };
      
      // Call next function
      nextTestimonial();
      
      // Check that first card is now active (looped back)
      const activeIndex = Array.from(testimonialContainer.children).findIndex(card => 
        card.classList.contains('active')
      );
      
      return assert.equal(activeIndex, 0, 'Should loop back to the first testimonial');
    })
    
    .test('Carousel should loop from first to last testimonial', function(assert) {
      // Setup
      const testimonialContainer = document.createElement('div');
      testimonialContainer.className = 'testimonial-container';
      
      // Create three testimonial cards
      for (let i = 0; i < 3; i++) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.dataset.index = i;
        if (i === 0) card.classList.add('active'); // Start with first card active
        testimonialContainer.appendChild(card);
      }
      
      document.querySelector = function(selector) {
        if (selector === '.testimonial-container') return testimonialContainer;
        if (selector === '.testimonial-card.active') return testimonialContainer.children[0];
        return null;
      };
      
      document.querySelectorAll = function(selector) {
        if (selector === '.testimonial-card') return Array.from(testimonialContainer.children);
        return [];
      };
      
      // Call prev function
      prevTestimonial();
      
      // Check that last card is now active (looped back)
      const activeIndex = Array.from(testimonialContainer.children).findIndex(card => 
        card.classList.contains('active')
      );
      
      return assert.equal(activeIndex, 2, 'Should loop back to the last testimonial');
    })
    
    .run();
}

// This function is needed in testimonials.test.js as well, but we only include it if it's not defined yet
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
        dataset: {},
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