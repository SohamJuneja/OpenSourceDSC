// List of projects with their details
const projects = [
    {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce solution with user authentication and payment integration.",
        technologies: ["React", "Node.js", "MongoDB"]
    },
    {
        title: "Weather App",
        description: "A real-time weather tracking application using a public weather API.",
        technologies: ["JavaScript", "API Integration"]
    }
];

// Function to display projects dynamically
function renderProjects(filter = null) {
    const projectContainer = document.querySelector('.project-container');
    projectContainer.innerHTML = ''; // Clear the container before rendering

    // Filter projects based on the selected technology
    const filteredProjects = filter
        ? projects.filter(project => project.technologies.includes(filter))
        : projects;

    // Show a message if no projects match the filter
    if (filteredProjects.length === 0) {
        projectContainer.innerHTML = '<p>No projects found for the selected filter.</p>';
        return;
    }

    // Create and display project cards
    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card', 'border', 'p-4', 'rounded', 'shadow-md', 'hover:shadow-lg', 'transition-shadow');

        projectCard.innerHTML = `
            <h3 class="text-xl font-bold">${project.title}</h3>
            <p class="text-gray-600">${project.description}</p>
            <div class="technologies mt-2">
                ${project.technologies.map(tech => `<span class="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">${tech}</span>`).join('')}
            </div>
        `;

        // Add interactivity: Show an alert when a project card is clicked
        projectCard.addEventListener('click', () => {
            alert(`You clicked on "${project.title}"`);
        });

        projectContainer.appendChild(projectCard);
    });
}

// Function to add a new project dynamically
function addProject(title, description, technologies) {
    projects.push({ title, description, technologies });
    renderProjects(); // Re-render the project list
}

// Function to set up project filters
function setupFilters() {
    const filterContainer = document.querySelector('.filter-container');
    const uniqueTechnologies = [...new Set(projects.flatMap(project => project.technologies))];

    // Create filter buttons for each unique technology
    uniqueTechnologies.forEach(tech => {
        const filterButton = document.createElement('button');
        filterButton.classList.add('filter-btn', 'bg-gray-200', 'text-gray-700', 'px-4', 'py-2', 'rounded', 'hover:bg-gray-300');
        filterButton.textContent = tech;

        filterButton.addEventListener('click', () => {
            renderProjects(tech);
        });

        filterContainer.appendChild(filterButton);
    });

    // Add a button to show all projects
    const allButton = document.createElement('button');
    allButton.classList.add('filter-btn', 'bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded', 'hover:bg-blue-600');
    allButton.textContent = 'All';

    allButton.addEventListener('click', () => {
        renderProjects();
    });

    filterContainer.insertBefore(allButton, filterContainer.firstChild);
}

// Function to handle the contact form submission
function setupContactForm() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message!');
        form.reset();
    });
}

// Initialize the page when the DOM is fully loaded
function initPage() {
    renderProjects(); // Display all projects
    setupFilters(); // Set up project filters
    setupContactForm(); // Set up the contact form
}

document.addEventListener('DOMContentLoaded', initPage);