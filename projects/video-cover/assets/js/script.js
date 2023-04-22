const dropArea = document.getElementById('drop-area');
let hour, minute, seconds, TIME_IN_SECONDS;

// functions
function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}

// drag and drop events
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
});


['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
});

dropArea.addEventListener('drop', (e) => {
  hour = +document.getElementById('hour').value;
  minute = +document.getElementById('minute').value;
  seconds = +document.getElementById('seconds').value;
  TIME_IN_SECONDS = (hour * 60 * 60) + (minute * 60) + (seconds);

  let files = e.dataTransfer.files;
  handleFiles(files);
}, false);

function handleFiles(files) {

  for (const file of files) {
    console.log(file);
    var reader = new FileReader();

    reader.onload = function (e) {


      // video player
      const videoPlayer = document.createElement('video');
      videoPlayer.src = e.target.result;
      videoPlayer.muted = true;


      videoPlayer.addEventListener('seeked', videoCover);

      // take screenshot from TIME_IN_SECONDS
      videoPlayer.currentTime = TIME_IN_SECONDS;

      // take screenshot if its 0 seconds
      if (TIME_IN_SECONDS === 0) { videoPlayer.currentTime = 1; }

      function videoCover() {
        // video size
        let w, h;
        w = videoPlayer.videoWidth;
        h = videoPlayer.videoHeight;

        // canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(videoPlayer, 0, 0, w, h);

        // image size
        const size = document.createElement('div');
        size.innerHTML = `image size: ${w}x${h}, video name: ${file.name}`;

        // convert it to png
        const imgData = canvas.toDataURL("image/png");

        // display png
        const img = document.createElement('img');
        img.src = imgData;
        document.body.appendChild(size);
        document.body.appendChild(img);

        // download png
        const a = document.createElement('a');
        a.href = imgData;
        a.download = file.name.split('.')[0] + '.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }

    reader.readAsDataURL(file);
  }
}
