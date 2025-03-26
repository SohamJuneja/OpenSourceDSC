const projects = [
    {
        title: "E-commerce Platform",
        description: "Full-stack e-commerce solution",
        technologies: ["React", "Node.js", "MongoDB"],
        details: "A comprehensive e-commerce platform with user authentication, product management, shopping cart, and payment integration."
    },
    {
        title: "Weather App",
        description: "Real-time weather tracking application",
        technologies: ["JavaScript", "API Integration"],
        details: "Weather application that provides real-time forecasts using third-party APIs, featuring location detection and interactive weather maps."
    }
];

function renderProjects(projectsToRender = projects) {
    const projectContainer = document.querySelector('.project-container');
    projectContainer.innerHTML = ''; // Clear existing projects
    
    projectsToRender.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-details hidden">
                <p>${project.details || 'No additional details available.'}</p>
            </div>
            <button class="details-toggle">Show Details</button>
        `;
        
        projectContainer.appendChild(projectCard);
        
        // Add click event to toggle details
        const detailsToggle = projectCard.querySelector('.details-toggle');
        const projectDetails = projectCard.querySelector('.project-details');
        
        detailsToggle.addEventListener('click', () => {
            projectDetails.classList.toggle('hidden');
            detailsToggle.textContent = projectDetails.classList.contains('hidden') ? 
                'Show Details' : 'Hide Details';
        });
    });
}

function addProject(newProject) {
    projects.push(newProject);
    renderProjects();
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
    }
    
    // Add "All" filter
    filterContainer.innerHTML = '<button class="filter-btn active" data-tech="all">All</button>';
    
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

function setupContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        console.log('Form submitted', { name, email, message });
    });
}

function setupNewProjectForm() {
    // Create a simple form for adding new projects
    const portfolioSection = document.querySelector('#projects');
    
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
                <label for="project-details">Detailed Description</label>
                <textarea id="project-details"></textarea>
            </div>
            <button type="submit">Add Project</button>
        </form>
    `;
    
    portfolioSection.appendChild(formContainer);
    
    // Add toggle button
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-form-btn');
    toggleButton.textContent = 'Add New Project';
    portfolioSection.insertBefore(toggleButton, formContainer);
    
    toggleButton.addEventListener('click', () => {
        formContainer.classList.toggle('hidden');
        toggleButton.textContent = formContainer.classList.contains('hidden') ? 
            'Add New Project' : 'Cancel';
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
            details: document.getElementById('project-details').value
        };
        
        addProject(newProject);
        
        // Reset form and update filters
        event.target.reset();
        formContainer.classList.add('hidden');
        toggleButton.textContent = 'Add New Project';
        setupProjectFilters(); // Refresh filters with new technologies
    });
}

function initPage() {
    renderProjects();
    setupProjectFilters();
    setupContactForm();
    setupNewProjectForm();
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