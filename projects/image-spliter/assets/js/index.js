//? display items when page load
window.addEventListener('DOMContentLoaded', function () {
  // upload file
  const uploadArea = document.querySelector('.upload-area');
  const uploadFile = document.querySelector('#upload-file');

  // edit image
  const areaFilters = document.querySelector('.area__filters');
  const imageFilter = document.querySelector('#img-filter');
  const areaEdit = document.querySelector('.edit__area');
  const imgSplit = document.querySelector('.img__split');
  const columnsInput = document.getElementById('columns');
  const rowsInput = document.getElementById('rows');
  const splitBtn = document.getElementById('split');
  const downloadBtn = document.getElementById('download');

  let lastFilter;

  function toggleEditArea() {
    areaEdit.classList.toggle('show');
  }

  function toggleUploadArea() {
    uploadArea.classList.toggle('hide');
  }

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight(e) {
    uploadArea.classList.add('highlight');
  }

  function unhighlight(e) {
    uploadArea.classList.remove('highlight');
  }

  // drag and drop events
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
  });

  ['dragenter', 'dragover'].forEach((eventName) => {
    uploadArea.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    uploadArea.addEventListener(eventName, unhighlight, false);
  });

  // input image files
  uploadArea.addEventListener('drop', (e) => {
    let image = e.dataTransfer.files[0];
    displayFilters(image);
  });

  uploadFile.onchange = function () {
    let image = this.files[0];
    if (image) displayFilters(image);
  };

  // read images
  function displayFilters(image) {
    const reader = new FileReader();

    reader.onload = function (e) {
      let inputImage = e.target.result;
      // main image
      imageFilter.src = inputImage;
      // all filters image
      areaFilters.querySelectorAll('img').forEach((img) => {
        img.src = inputImage;
      });

      toggleUploadArea();
      toggleEditArea();
    };

    reader.readAsDataURL(image);
  }

  areaFilters.addEventListener('click', (e) => {
    if (e.target.tagName == 'IMG') {
      if (lastFilter) {
        imageFilter.classList.remove(lastFilter);
      }

      let filter = e.target.classList[0];
      imageFilter.classList.add(filter);
      lastFilter = filter;
    }
  });

  splitBtn.addEventListener('click', () => {
    const columns = columnsInput.value;
    const rows = rowsInput.value;
    const section_width = imageFilter.naturalWidth / columns;
    const section_height = imageFilter.naturalHeight / rows;
    const filter = getComputedStyle(imageFilter)['filter'];

    imgSplit.innerHTML = '';

    for (var y = 0; y < rows; y++) {
      const group = document.createElement('div');
      group.classList.add('group');

      for (var x = 0; x < columns; x++) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const img = document.createElement('img');

        canvas.width = Math.ceil(section_width);
        canvas.height = Math.ceil(section_height);
        context.filter = filter;
        context.drawImage(imageFilter, x * section_width, y * section_height, section_width, section_height, 0, 0, canvas.width, canvas.height);
        img.src = canvas.toDataURL();
        img.style.width = `${Math.floor(100 / columns)}%`;

        group.appendChild(img);
      }

      imgSplit.appendChild(group);
    }
  });

  downloadBtn.addEventListener('click', () => {
    const images = imgSplit.querySelectorAll('img');
    let counter = 1;

    for (const image of images) {
      const a = document.createElement('a');
      a.href = image.src;
      a.download = `${counter}.png`;
      setTimeout(() => {
        a.click();
      }, counter++ * 100);
    }
  });
});
