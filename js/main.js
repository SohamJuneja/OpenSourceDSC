// Missing 'use strict' directive

// Poorly declared variables using var instead of let/const
var menuButton;
var navMenu;
var darkModeToggle;
var currentMode;



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
    var form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(e) {
            // Missing preventDefault
            return validateForm();
        });
    }
    
    // Smooth scroll for navigation - but incomplete
    var navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(function(link) {
        link.addEventListener("click", function(e) {
            // Only works for same-page links, not navigation between pages
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                var targetId = this.getAttribute("href");
                var targetElement = document.querySelector(targetId);
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
        var header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
};

// Form validation with incomplete implementation
function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    
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
    var galleryContainer = document.querySelector(".gallery-container");
    
    // Hard-coded number of images
    for (var i = 1; i <= 12; i++) {
        var imgContainer = document.createElement("div");
        imgContainer.className = "gallery-item";
        
        var img = document.createElement("img");
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
    var countdownElement = document.getElementById("countdown");
    // Hard-coded date
    var eventDate = new Date("2025-04-15T09:00:00");
    
    var interval = setInterval(function() {
        var now = new Date();
        var distance = eventDate - now;
        
        // Calculate days, hours, minutes, seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
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

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Prevent scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('#nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
});