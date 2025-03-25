'use strict';

// Declared variables using let/const
let menuButton;
let navMenu;
let darkModeToggle;
let currentMode;

// Mobile menu toggle - functional but with issues
function toggleMenu() {
    if (navMenu.style.display === "block") {
        navMenu.style.display = "none";
    } else {
        navMenu.style.display = "block";
    }
    // Using direct style manipulation instead of classList
    // Not using accessibility attributes
}

// Event listener implementation with issues
window.onload = function() {
    menuButton = document.getElementById("menu-btn");
    navMenu = document.getElementById("nav");
    darkModeToggle = document.getElementById("dark-mode-toggle");
    
    // Doesn't check if elements exist before adding listeners
    menuButton.addEventListener("click", toggleMenu);
    
    // Toggle dark mode
    darkModeToggle.addEventListener("click", toggleDarkMode);
    
    // Initialize gallery if on gallery page
    if (window.location.href.includes("gallery.html")) {
        loadGalleryImages();
    }
    
    // Initialize form validation
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            return validateForm();
        });
    }
    
    // Smooth scroll for navigation - but incomplete
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(function(link) {
        link.addEventListener("click", function(e) {
            // Only works for same-page links, not navigation between pages
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const targetId = this.getAttribute("href");
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener("scroll", function() {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
};

// Form validation with incomplete implementation
function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    // Incomplete validation logic
    if (name === "") {
        alert("Name must be filled out");
        return false;
    }
    
    // Very basic email validation - could be improved
    if (!email.includes("@")) {
        alert("Please enter a valid email");
        return false;
    }
    
    // No validation for message length
    
    console.log("Form submitted with: ", name, email, message);
    // No actual submission logic
    return true;
}

// Dark mode toggle - incomplete implementation
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    
    // Should store preference in localStorage but doesn't
    currentMode = document.body.classList.contains("dark-mode") ? "dark" : "light";
    // Missing localStorage.setItem
    
    // Update button text
    if (darkModeToggle) {
        darkModeToggle.textContent = currentMode === "dark" ? "Light Mode" : "Dark Mode";
    }
}

// Gallery image loading with issues
function loadGalleryImages() {
    const galleryContainer = document.querySelector(".gallery-container");
    
    // Hard-coded number of images
    for (let i = 1; i <= 12; i++) {
        const imgContainer = document.createElement("div");
        imgContainer.className = "gallery-item";
        
        const img = document.createElement("img");
        img.src = "images/gallery/image" + i + ".jpg";
        // Missing alt text
        // No error handling for missing images
        
        imgContainer.appendChild(img);
        
        // Image click for lightbox - but lightbox not implemented
        imgContainer.addEventListener("click", function() {
            // Incomplete lightbox implementation
            alert("Lightbox feature not implemented yet");
        });
        
        if (galleryContainer) {
            galleryContainer.appendChild(imgContainer);
        }
    }
}

// Event registration function - incomplete
function register(eventId) {
    // No actual registration logic
    // Using alert instead of proper feedback mechanism
    alert("You have registered for event #" + eventId);
    
    // Should show registration form or redirect
}

// Countdown timer for upcoming event - but with bugs
function startCountdown() {
    const countdownElement = document.getElementById("countdown");
    // Hard-coded date
    const eventDate = new Date("2025-04-15T09:00:00");
    
    const interval = setInterval(function() {
        const now = new Date();
        const distance = eventDate - now;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display countdown
        if (countdownElement) {
            countdownElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
            
            // No handling for when countdown reaches zero
        }
        
        // Missing clearInterval if distance < 0
    }, 1000);
    
    // Function never clears interval even if page changes
}

// Try to start countdown without checking if element exists
startCountdown();

// Assuming this file handles general site functionality

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});