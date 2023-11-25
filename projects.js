document.addEventListener('DOMContentLoaded', function () {
    // Assuming projects data is stored in projects.json
    fetch('projects.json')
        .then(response => response.json())
        .then(data => displayProjects(data));

    function displayProjects(projects) {
        const projectList = document.getElementById('projectList');
        const projectFilter = document.getElementById('projectFilter');

        // Initial display of projects
        renderProjects(projects);

        // Filter projects when user types in the input field
        projectFilter.addEventListener('input', function () {
            const filterText = projectFilter.value.toLowerCase();
            const filteredProjects = projects.filter(project =>
                project.technology.toLowerCase().includes(filterText)
            );
            renderProjects(filteredProjects);
        });

        function renderProjects(projects) {
            projectList.innerHTML = ''; // Clear existing projects

            if (projects.length === 0) {
                const noResults = document.createElement('li');
                noResults.textContent = 'No projects found.';
                projectList.appendChild(noResults);
            } else {
                projects.forEach(project => {
                    const projectItem = document.createElement('li');
                    projectItem.innerHTML = `
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <p>Technology: ${project.technology}</p>
                        <hr>
                    `;
                    projectList.appendChild(projectItem);
                });
            }
        }
    }
});
