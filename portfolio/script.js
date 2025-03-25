const projects = [
    {
        title: "E-commerce Platform",
        description: "Full-stack e-commerce solution",
        technologies: ["React", "Node.js", "MongoDB"]
    },
    {
        title: "Weather App",
        description: "Real-time weather tracking application",
        technologies: ["JavaScript", "API Integration"]
    }
];

function renderProjects() {
    const projectContainer = document.querySelector('.project-container');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        `;
        
        projectContainer.appendChild(projectCard);
    });
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    
    // Create error message container if it doesn't exist
    let errorContainer = document.querySelector('.form-errors');
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'form-errors';
        errorContainer.style.display = 'none';
        form.insertBefore(errorContainer, form.firstChild);
    }
    
    // Function to display error messages
    function showError(message) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        // Remove success class if present
        errorContainer.classList.remove('form-success');
        errorContainer.classList.add('form-errors');
    }
    
    // Function to display success message
    function showSuccess(message) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        // Replace error class with success class
        errorContainer.classList.remove('form-errors');
        errorContainer.classList.add('form-success');
    }
    
    // Function to clear error messages
    function clearMessages() {
        errorContainer.textContent = '';
        errorContainer.style.display = 'none';
    }
    
    // Add input event listeners for real-time validation feedback
    const nameInput = form.elements.name;
    const emailInput = form.elements.email;
    const messageInput = form.elements.message;
    
    // Real-time name validation
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim().length < 2) {
            nameInput.classList.remove('valid');
            nameInput.classList.add('invalid');
        } else {
            nameInput.classList.remove('invalid');
            nameInput.classList.add('valid');
        }
    });
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        const isValidEmail = validateEmail(emailInput.value.trim());
        if (isValidEmail) {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
        } else {
            emailInput.classList.remove('valid');
            emailInput.classList.add('invalid');
        }
    });
    
    // Real-time message validation
    messageInput.addEventListener('input', function() {
        if (messageInput.value.trim().length < 10) {
            messageInput.classList.remove('valid');
            messageInput.classList.add('invalid');
        } else {
            messageInput.classList.remove('invalid');
            messageInput.classList.add('valid');
        }
    });
    
    // Email validation function using regex
    function validateEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }
    
    // Sanitize input to prevent XSS attacks
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        clearMessages();
        
        // Get and trim form values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        // Validate name (minimum 2 characters)
        if (!name) {
            showError('Please enter your name');
            nameInput.focus();
            return;
        } else if (name.length < 2) {
            showError('Name must be at least 2 characters long');
            nameInput.focus();
            return;
        }
        
        // Validate email format
        if (!email) {
            showError('Please enter your email address');
            emailInput.focus();
            return;
        } else if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            emailInput.focus();
            return;
        }
        
        // Validate message (minimum 10 characters)
        if (!message) {
            showError('Please enter your message');
            messageInput.focus();
            return;
        } else if (message.length < 10) {
            showError('Message must be at least 10 characters long');
            messageInput.focus();
            return;
        }
        
        // Sanitize all inputs
        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedMessage = sanitizeInput(message);
        
        // If validation passes, show success message
        showSuccess('Form submitted successfully!');
        
        // Reset form fields and styling
        form.reset();
        nameInput.classList.remove('valid', 'invalid');
        emailInput.classList.remove('valid', 'invalid');
        messageInput.classList.remove('valid', 'invalid');
        
        // Log form data to console
        console.log('Form submitted', { 
            name: sanitizedName, 
            email: sanitizedEmail, 
            message: sanitizedMessage 
        });
        
        // Here you would typically send the data to a server
        // setTimeout is used to simulate a server request
        setTimeout(() => {
            clearMessages();
        }, 3000);
    });
}

function initPage() {
    renderProjects();
    setupContactForm();
}

// Hamburger Menu Functionality
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', initPage);