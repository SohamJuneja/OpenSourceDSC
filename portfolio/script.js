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
        alert('Message sent successfully!');
        form.reset();
    });
}

function smoothScroll() {
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function initPage() {
    renderProjects();
    setupContactForm();
    smoothScroll();
}

document.addEventListener('DOMContentLoaded', initPage);