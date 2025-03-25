// Gallery specific JavaScript with intentional issues

// Missing 'use strict'

// Poorly declared variables
var galleryImages = [];
var currentCategory = 'all';

// Data hardcoded instead of fetched from an API
var galleryData = [
    { id: 1, src: "images/gallery/hackathon1.jpg", category: "hackathon", caption: "Annual Hackathon 2024" },
    { id: 2, src: "images/gallery/workshop1.jpg", category: "workshop", caption: "Python for Beginners" },
    { id: 3, src: "images/gallery/social1.jpg", category: "social", caption: "End of Year Party" },
    { id: 4, src: "images/gallery/hackathon2.jpg", category: "hackathon", caption: "Team Coding Session" },
    { id: 5, src: "images/gallery/workshop2.jpg", category: "workshop", caption: "Web Development Workshop" },
    { id: 6, src: "images/gallery/social2.jpg", category: "social", caption: "Tech Meetup" },
    { id: 7, src: "images/gallery/hackathon3.jpg", category: "hackathon", caption: "Hackathon Winners" },
    { id: 8, src: "images/gallery/workshop3.jpg", category: "workshop", caption: "Mobile App Development" },
    { id: 9, src: "images/gallery/social3.jpg", category: "social", caption: "Networking Event" },
    // Should have at least 12 images for a proper grid
];

// Initialize gallery on page load
window.onload = function() {
    loadGallery();
    setupLightbox();
    
    // Event listener for filter clicks
    var filters = document.querySelectorAll('.gallery-filters span');
    filters.forEach(function(filter) {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Update current category and reload gallery
            currentCategory = this.getAttribute('onclick').match(/'(.*?)'/)[1];
            loadGallery();
        });
    });
    
    // Form submission handling - with issues
    var form = document.querySelector('.upload-section form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Just shows alert instead of actual upload logic
            alert('Photo upload functionality is not implemented yet.');
            // Doesn't validate form
            this.reset();
        });
    }
};

// Load gallery images based on current category
function loadGallery() {
    var container = document.querySelector('.gallery-container');
    // Doesn't check if container exists
    
    // Clear container
    container.innerHTML = '';
    
    // Filter images based on category
    var filteredImages = currentCategory === 'all' 
        ? galleryData 
        : galleryData.filter(img => img.category === currentCategory);
    
    // Check if there are images
    if (filteredImages.length === 0) {
        container.innerHTML = '<p class="empty-gallery">No images found in this category.</p>';
        return;
    }
    
    // Create image elements
    filteredImages.forEach(function(image) {
        var item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.id = image.id;
        
        var img = document.createElement('img');
        img.src = image.src;
        // Missing alt text
        
        // Missing error handling for image load failures
        
        item.appendChild(img);
        
        // Add click event for lightbox
        item.addEventListener('click', function() {
            openLightbox(image);
        });
        
        container.appendChild(item);
    });
}

// Lightbox functionality - incomplete
function setupLightbox() {
    var lightbox = document.getElementById('lightbox');
    var closeLightbox = document.querySelector('.close-lightbox');
    
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
    }
    
    // Missing keyboard accessibility
    // Missing click outside to close
}

function openLightbox(image) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var caption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImg && caption) {
        lightboxImg.src = image.src;
        caption.textContent = image.caption;
        lightbox.style.display = 'block';
    }
    
    // Missing error handling
    // Missing loading indicators
    // Missing navigation between images
}

// Filter gallery function - called by onclick
function filterGallery(category) {
    currentCategory = category;
    loadGallery();
    
    // Should update active class on filter buttons
    // But this is handled by the event listener instead
    // Creating inconsistent behavior
}

// Missing lazy loading implementation
// Missing proper pagination
// Missing proper error handling

// Assuming this file handles image gallery functionality

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-img');
    const closeModal = document.querySelector('.close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.querySelector('img').src;
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});