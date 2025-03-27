const projects = [
    {
        title: "E-commerce Platform",
        description: "Full-stack e-commerce solution",
        technologies: ["React", "Node.js", "MongoDB"],
        details: "A comprehensive e-commerce platform with user authentication, product management, shopping cart, and payment integration.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        title: "Weather App",
        description: "Real-time weather tracking application",
        technologies: ["JavaScript", "API Integration"],
        details: "Weather application that provides real-time forecasts using third-party APIs, featuring location detection and interactive weather maps.",
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

function renderProjects(projectsToRender = projects) {
    const projectContainer = document.querySelector('.project-container');
    projectContainer.innerHTML = ''; // Clear existing projects
    
    projectsToRender.forEach(project => {
        const projectCard = document.createElement('div');
    projects.forEach(project => {
        const projectCard = document.createElement('article');
        projectCard.classList.add('project-card');
        
        projectCard.innerHTML = `
            <div class="project-image" style="background-image: url('${project.image || ''}')">
                ${!project.image ? '<div class="project-image-placeholder"><i class="fas fa-code"></i></div>' : ''}
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-details hidden">
                    <p>${project.details || 'No additional details available.'}</p>
                </div>
                <button class="details-toggle">
                    <span>View Details</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>
        `;
        
        projectContainer.appendChild(projectCard);
        
        // Add click event to toggle details
        const detailsToggle = projectCard.querySelector('.details-toggle');
        const projectDetails = projectCard.querySelector('.project-details');
        
        detailsToggle.addEventListener('click', () => {
            projectDetails.classList.toggle('hidden');
            const isHidden = projectDetails.classList.contains('hidden');
            detailsToggle.querySelector('span').textContent = isHidden ? 'View Details' : 'Hide Details';
            detailsToggle.querySelector('i').className = isHidden ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        });
    });
}

function addProject(newProject) {
    projects.push(newProject);
    renderProjects();
    setupProjectFilters(); // Refresh filters with new technologies
    return projects.length; // Return new project count
}

function setupProjectFilters() {
    // Get all unique technologies
    const allTechnologies = new Set();
    projects.forEach(project => {
        project.technologies.forEach(tech => allTechnologies.add(tech));
    });
    
    // Create filter container if it doesn't exist
    let filterContainer = document.querySelector('.project-filters');
    if (!filterContainer) {
        filterContainer = document.createElement('div');
        filterContainer.classList.add('project-filters');
        document.querySelector('.project-container').parentNode.insertBefore(
            filterContainer, document.querySelector('.project-container')
        );
    } else {
        filterContainer.innerHTML = ''; // Clear existing filters
    }
    
    // Add "All" filter
    const allButton = document.createElement('button');
    allButton.classList.add('filter-btn', 'active');
    allButton.setAttribute('data-tech', 'all');
    allButton.textContent = 'All Projects';
    filterContainer.appendChild(allButton);
    
    // Add technology filters
    allTechnologies.forEach(tech => {
        const filterBtn = document.createElement('button');
        filterBtn.classList.add('filter-btn');
        filterBtn.setAttribute('data-tech', tech);
        filterBtn.textContent = tech;
        filterContainer.appendChild(filterBtn);
    });
    
    // Add filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tech = btn.getAttribute('data-tech');
            if (tech === 'all') {
                renderProjects();
            } else {
                const filteredProjects = projects.filter(project => 
                    project.technologies.includes(tech)
                );
                renderProjects(filteredProjects);
            }
        });
    });
}

function setupNewProjectForm() {
    // Create a simple form for adding new projects
    const portfolioSection = document.querySelector('#projects .container');
    
    const formContainer = document.createElement('div');
    formContainer.classList.add('add-project-container', 'hidden');
    
    formContainer.innerHTML = `
        <h3>Add New Project</h3>
        <form id="add-project-form">
            <div class="form-group">
                <label for="project-title">Project Title</label>
                <input type="text" id="project-title" required>
            </div>
            <div class="form-group">
                <label for="project-description">Description</label>
                <input type="text" id="project-description" required>
            </div>
            <div class="form-group">
                <label for="project-technologies">Technologies (comma separated)</label>
                <input type="text" id="project-technologies" required>
            </div>
            <div class="form-group">
                <label for="project-image">Image URL (optional)</label>
                <input type="url" id="project-image">
            </div>
            <div class="form-group">
                <label for="project-details">Detailed Description</label>
                <textarea id="project-details" rows="4"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-cancel">Cancel</button>
                <button type="submit" class="btn-submit">Add Project</button>
            </div>
        </form>
    `;
    
    portfolioSection.appendChild(formContainer);
    
    // Add toggle button
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-form-btn');
    toggleButton.innerHTML = '<i class="fas fa-plus"></i> Add New Project';
    portfolioSection.appendChild(toggleButton);
    
    toggleButton.addEventListener('click', () => {
        formContainer.classList.toggle('hidden');
        toggleButton.classList.toggle('active');
        if (!formContainer.classList.contains('hidden')) {
            formContainer.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Handle cancel button
    formContainer.querySelector('.btn-cancel').addEventListener('click', () => {
        formContainer.classList.add('hidden');
        toggleButton.classList.remove('active');
        document.getElementById('add-project-form').reset();
    });
    
    // Handle form submission
    document.getElementById('add-project-form').addEventListener('submit', (event) => {
        event.preventDefault();
        
        const newProject = {
            title: document.getElementById('project-title').value,
            description: document.getElementById('project-description').value,
            technologies: document.getElementById('project-technologies').value
                .split(',')
                .map(tech => tech.trim())
                .filter(tech => tech),
            details: document.getElementById('project-details').value,
            image: document.getElementById('project-image').value || null
        };
        
        addProject(newProject);
        
        // Reset form and hide
        event.target.reset();
        formContainer.classList.add('hidden');
        toggleButton.classList.remove('active');
    });
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically make an AJAX request to your backend
        console.log('Form submitted', { name, email, message });
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
        form.appendChild(successMessage);
        
        // Reset form
        form.reset();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
}

function initPage() {
    renderProjects();
    setupProjectFilters();
    setupNewProjectForm();
    setupContactForm();
}

// Initialize hamburger menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
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
    }
    
    // Initialize the page
    initPage();
});