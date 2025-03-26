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
    

        const projectCard = document.createElement('article');
        projectCard.classList.add('project-card');
        projectCard.setAttribute('role', 'listitem');
        projectCard.setAttribute('aria-labelledby', `project-title-${index}`);
        
        projectCard.innerHTML = `
            <h3 id="project-title-${index}">${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies" role="list" aria-label="Technologies used">
                ${project.technologies.map(tech => 
                    `<span role="listitem">${tech}</span>`
                ).join('')}
            </div>
        `;
        
        projectContainer.appendChild(projectCard);
    });
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        
        // Clear previous error states
        form.querySelectorAll('.error-message').forEach(el => el.remove());
        
        if (!name || !email || !message) {
            showFormError('Please fill in all required fields');
            return;
        }
        
        try {
            submitButton.setAttribute('disabled', 'true');
            submitButton.setAttribute('aria-busy', 'true');
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('Form submitted', { name, email, message });
            form.reset();
            showFormSuccess('Message sent successfully!');
        } catch (error) {
            showFormError('Failed to send message. Please try again.');
        } finally {
            submitButton.removeAttribute('disabled');
            submitButton.removeAttribute('aria-busy');
            submitButton.textContent = 'Send Message';
        }
    });
}

function showFormError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.setAttribute('role', 'alert');
    errorDiv.textContent = message;
    document.getElementById('contact-form').prepend(errorDiv);
}

function showFormSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.setAttribute('role', 'status');
    successDiv.textContent = message;
    document.getElementById('contact-form').prepend(successDiv);
    
    setTimeout(() => successDiv.remove(), 3000);
}

function initPage() {
    renderProjects();
    setupContactForm();
}

document.addEventListener('DOMContentLoaded', initPage);