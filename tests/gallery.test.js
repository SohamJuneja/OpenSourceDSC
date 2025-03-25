'use strict';

// Tests for gallery.js
function runGalleryTests() {
  // Create a mock DOM for testing
  setupMockDOM();
  
  return TestFramework
    // Test loadGallery function
    .test('loadGallery should populate gallery container', function(assert) {
      // Setup
      const container = document.createElement('div');
      container.className = 'gallery-container';
      
      document.querySelector = function(selector) {
        if (selector === '.gallery-container') return container;
        return null;
      };
      
      // Set current category to 'all'
      window.currentCategory = 'all';
      
      // Mock galleryData
      window.galleryData = [
        { id: 1, src: 'test1.jpg', category: 'hackathon', caption: 'Test 1' },
        { id: 2, src: 'test2.jpg', category: 'workshop', caption: 'Test 2' }
      ];
      
      // Call the function
      loadGallery();
      
      // Check that gallery items were created
      return assert.equal(container.children.length, 2, 'Should create 2 gallery items');
    })
    
    .test('loadGallery should filter images by category', function(assert) {
      // Setup
      const container = document.createElement('div');
      container.className = 'gallery-container';
      
      document.querySelector = function(selector) {
        if (selector === '.gallery-container') return container;
        return null;
      };
      
      // Set current category to 'workshop'
      window.currentCategory = 'workshop';
      
      // Mock galleryData
      window.galleryData = [
        { id: 1, src: 'test1.jpg', category: 'hackathon', caption: 'Test 1' },
        { id: 2, src: 'test2.jpg', category: 'workshop', caption: 'Test 2' }
      ];
      
      // Call the function
      loadGallery();
      
      // Check that only workshop category items were created
      return assert.equal(container.children.length, 1, 'Should create 1 gallery item for workshop category');
    })
    
    .test('loadGallery should show message when no images in category', function(assert) {
      // Setup
      const container = document.createElement('div');
      container.className = 'gallery-container';
      
      document.querySelector = function(selector) {
        if (selector === '.gallery-container') return container;
        return null;
      };
      
      // Set current category to 'nonexistent'
      window.currentCategory = 'nonexistent';
      
      // Mock galleryData
      window.galleryData = [
        { id: 1, src: 'test1.jpg', category: 'hackathon', caption: 'Test 1' },
        { id: 2, src: 'test2.jpg', category: 'workshop', caption: 'Test 2' }
      ];
      
      // Call the function
      loadGallery();
      
      // Check that empty gallery message was added
      return assert.true(container.innerHTML.includes('No images found'), 'Should show no images message');
    })
    
    // Test filterGallery function
    .test('filterGallery should set currentCategory and call loadGallery', function(assert) {
      // Save original loadGallery
      const originalLoadGallery = window.loadGallery;
      
      // Track if loadGallery was called
      let loadGalleryCalled = false;
      window.loadGallery = function() {
        loadGalleryCalled = true;
      };
      
      // Call filterGallery
      filterGallery('test-category');
      
      // Restore original function
      window.loadGallery = originalLoadGallery;
      
      // Check that currentCategory was set and loadGallery was called
      const categoryResult = assert.equal(window.currentCategory, 'test-category', 'Should set currentCategory');
      if (!categoryResult.passed) return categoryResult;
      
      return assert.true(loadGalleryCalled, 'Should call loadGallery');
    })
    
    // Test setupLightbox function
    .test('setupLightbox should add click event to close button', function(assert) {
      // Setup
      const lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.style.display = 'block';
      
      const closeButton = document.createElement('button');
      closeButton.className = 'close-lightbox';
      
      document.getElementById = function(id) {
        if (id === 'lightbox') return lightbox;
        return null;
      };
      
      document.querySelector = function(selector) {
        if (selector === '.close-lightbox') return closeButton;
        return null;
      };
      
      // Call setupLightbox
      setupLightbox();
      
      // Trigger the click event
      if (closeButton.click) {
        closeButton.click();
      } else if (typeof closeButton.addEventListener === 'function') {
        // Manually trigger the event handler
        if (closeButton.events && closeButton.events.click) {
          closeButton.events.click();
        }
      }
      
      // Check that lightbox display was set to none
      return assert.equal(lightbox.style.display, 'none', 'Lightbox should be hidden after clicking close button');
    })
    
    // Test openLightbox function
    .test('openLightbox should display the lightbox with the correct image', function(assert) {
      // Setup
      const lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.style.display = 'none';
      
      const lightboxImg = document.createElement('img');
      lightboxImg.id = 'lightbox-img';
      
      const caption = document.createElement('div');
      caption.id = 'lightbox-caption';
      
      document.getElementById = function(id) {
        if (id === 'lightbox') return lightbox;
        if (id === 'lightbox-img') return lightboxImg;
        if (id === 'lightbox-caption') return caption;
        return null;
      };
      
      // Test image data
      const image = {
        src: 'test-image.jpg',
        caption: 'Test Caption'
      };
      
      // Call openLightbox
      openLightbox(image);
      
      // Check that lightbox was shown with correct image and caption
      const displayResult = assert.equal(lightbox.style.display, 'block', 'Lightbox should be visible');
      if (!displayResult.passed) return displayResult;
      
      const srcResult = assert.equal(lightboxImg.src, image.src, 'Image source should be set correctly');
      if (!srcResult.passed) return srcResult;
      
      return assert.equal(caption.textContent, image.caption, 'Caption should be set correctly');
    })
    
    .run();
}

// This function is needed in gallery.test.js as well, but we only include it if it's not defined yet
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
        textContent: '',
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
        },
        dataset: {},
        addEventListener: function(event, callback) {
          if (!this.events) this.events = {};
          this.events[event] = callback;
        }
      };
    };
    
    // Mock other methods
    document.querySelector = document.querySelector || function() { return null; };
    document.querySelectorAll = document.querySelectorAll || function() { return []; };
    document.getElementById = document.getElementById || function() { return null; };
    
    window.alert = window.alert || function() {};
  }
} 