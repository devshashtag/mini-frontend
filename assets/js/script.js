'use strict';

function projectTemplate(project, root = '/projects') {
  return `
    <!-- ${project.name} -->
    <div class="projects__card">
        <img src="${project.image}" alt="${project.name}" loading="lazy" />
        <div class="card__caption">${project.name}</div>
        <a href="${root + project.url}" target="_blank"></a>
    </div>
  `;
}

async function displayCards(url) {
  const projectsAPI = '/assets/js/projects.json';
  const projects = await fetch(projectsAPI).then((resp) => resp.json());
  const projectsElement = document.getElementById('projects');

  for (const project of projects) {
    projectsElement.insertAdjacentHTML('beforeend', projectTemplate(project));
  }
}

displayCards();
