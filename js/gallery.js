'use strict';

// Properly declared variables
let galleryImages = [];
let currentCategory = 'all';
let currentPage = 1;
const itemsPerPage = 6;

// Fetch data from an API
async function fetchGalleryData() {
    try {
        const response = await fetch('path/to/api/gallery');
        galleryData = await response.json();
        loadGallery();
    } catch (error) {
        console.error('Error fetching gallery data:', error);
    }
}

// Initialize gallery on page load
window.onload = function() {
    fetchGalleryData();
    setupLightbox();
    
    // Event listener for filter clicks
    const filters = document.querySelectorAll('.gallery-filters button');
    filters.forEach(function(filter) {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Update current category and reload gallery
            currentCategory = this.getAttribute('data-category');
            currentPage = 1;
            loadGallery();
        });
    });
    
    // Form submission handling
    const form = document.querySelector('.upload-section form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Photo upload functionality is not implemented yet.');
            this.reset();
        });
    }
};

// Load gallery images based on current category and page
function loadGallery() {
    const container = document.querySelector('.gallery-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const filteredImages = currentCategory === 'all' 
        ? galleryData 
        : galleryData.filter(img => img.category === currentCategory);
    
    if (filteredImages.length === 0) {
        container.innerHTML = '<p class="empty-gallery">No images found in this category.</p>';
        return;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedImages = filteredImages.slice(startIndex, endIndex);
    
    paginatedImages.forEach(function(image) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.id = image.id;
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.caption;
        img.loading = 'lazy';
        
        img.onerror = function() {
            img.src = 'path/to/placeholder.jpg';
        };
        
        item.appendChild(img);
        
        item.addEventListener('click', function() {
            openLightbox(image);
        });
        
        container.appendChild(item);
    });
    
    setupPagination(filteredImages.length);
}

// Setup pagination controls
function setupPagination(totalItems) {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;
    
    pagination.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? 'active' : '';
        
        pageButton.addEventListener('click', function() {
            currentPage = i;
            loadGallery();
        });
        
        pagination.appendChild(pageButton);
    }
}

// Lightbox functionality
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
    }
    
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            lightbox.style.display = 'none';
        }
    });
    
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

function openLightbox(image) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImg && caption) {
        lightboxImg.src = image.src;
        caption.textContent = image.caption;
        lightbox.style.display = 'block';
    }
}

// Fetch gallery data on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchGalleryData();
});