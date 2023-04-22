//? display items when page load
window.addEventListener("DOMContentLoaded", function () {
  // upload file
  const uploadArea = document.querySelector(".upload-area");
  const uploadFile = document.querySelector("#upload-file");

  // edit image
  const areaFilters = document.querySelector('.area__filters');
  const imageFilter = document.querySelector('#img-filter');
  const areaEdit = document.querySelector('.edit__area')
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
    uploadArea.classList.add("highlight");
  }

  function unhighlight(e) {
    uploadArea.classList.remove("highlight");
  }

  // drag and drop events
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, unhighlight, false);
  });

  // input image files
  uploadArea.addEventListener("drop", (e) => {
    let image = e.dataTransfer.files[0];
    displayFilters(image);
  }, false);


  uploadFile.onchange = function () {
    let image = this.files[0];
    if (image) displayFilters(image);
  }

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
    }

    reader.readAsDataURL(image);
  }

  areaFilters.addEventListener('click', (e) => {
    if (e.target.tagName == "IMG") {
      if (lastFilter) {
        imageFilter.classList.remove(lastFilter);
      }

      let filter = e.target.classList[0];
      imageFilter.classList.add(filter);
      lastFilter = filter;
    }
  }, false);
});

function closeImage() {
  const uploadArea = document.querySelector(".upload-area");
  const areaEdit = document.querySelector('.edit__area')
  areaEdit.classList.toggle('show');
  uploadArea.classList.toggle('hide');
}

