'use strict';

async function displayCards(url, root = '/mini-frontend') {
  const projectsAPI = root + '/assets/js/projects.json';
  const projectRoot = root + '/projects';

  const projects = await fetch(projectsAPI).then((resp) => resp.json());
  const projectsElement = document.getElementById('projects');

  for (const project of projects) {
    const projectTemplate = `
      <!-- ${project.name} -->
      <div class="projects__card">
          <img src="${root + project.image}" alt="${project.name}" loading="lazy" />
          <div class="card__caption">${project.name}</div>
          <a href="${projectRoot + project.url}" target="_blank"></a>
      </div>
    `;

    projectsElement.insertAdjacentHTML('beforeend', projectTemplate);
  }
}

displayCards();
