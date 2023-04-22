const btnRandColor = document.querySelector("#randomColor");
const btnCopyColor = document.querySelector("#CopyColor");
const historyList = document.querySelector(".history");
const delayCopy = 500;
const startColorNum = 400;
let ActiveItem;


for (let i = 1; i < startColorNum; i++)
  ChangeColor(false);
ChangeColor();

// events
btnRandColor.addEventListener("click", ChangeColor);

// change active item by clicking
historyList.addEventListener("click", function (e) {
  if (e.target.classList.contains("hist-item")) {
    ActiveHistoryElement(e.target);
  }
});

// copy to clipboard
btnCopyColor.addEventListener("click", function () {
  let hexColor = btnCopyColor.innerHTML;

  if (hexColor.indexOf('#') >= 0) {
    navigator.clipboard.writeText(hexColor);
    btnCopyColor.innerHTML = "Copied!";
    setTimeout(function () {
      btnCopyColor.innerHTML = hexColor;
    }, delayCopy);
  }
});


// functions
function ChangeColor(active = true) {
  // generate random color
  let hexColor = randHexColor();

  // create an history color item
  let historyItem = document.createElement("div");

  // random background color
  historyItem.style.backgroundColor = hexColor;


  historyItem.classList.add('hist-item');
  historyList.appendChild(historyItem);


  if (active) {
    // update active item
    ActiveHistoryElement(historyItem);

    historyItem.scrollIntoView();
  }
}

function randHexColor() {
  // random number in range color
  let randNum = (1 << 24) * Math.random() | 0;
  // convert number to hex=> (0 == 000000),(16777215 == ffffff)
  // red=ff, green=ff, blue=ff
  let hexNum = randNum.toString(16)
  // #[random hex code color]
  return "#" + hexNum.padStart(6, "0");
}

function ActiveHistoryElement(target) {
  // return if target is activeItem
  if (target && target.classList.contains("active")) return;

  // remove current active item in history if exist
  if (ActiveItem && ActiveItem.classList.contains("active")) {
    ActiveItem.classList.remove('active');
  }

  // set new active item
  ActiveItem = target;
  ActiveItem.classList.add("active");

  // copy active item color to copy button
  let bgColor = ActiveItem.style.backgroundColor;
  btnCopyColor.style.backgroundColor = bgColor;
  btnCopyColor.style.color = invertRGBColor(bgColor);

  // set hex color code
  btnCopyColor.innerHTML = rgbToHex(bgColor);
}

function rgbToHex(rgb) {
  let rgbCode = rgb.slice(4, -1).split(',');
  let hexCode = rgbCode.map((num) => parseInt(num).toString(16).padStart(2, "0"));
  let hexColor = '#' + hexCode.join('');

  return hexColor;
}

function invertRGBColor(rgb) {
  let [r, g, b] = (rgb.slice(4, -1).split(',').map((num) => parseInt(num)))

  return (r * 0.299 + g * 0.587 + b * 0.114) > 156 ? '#000000' : '#FFFFFF';
}

window.onresize = () => {
  ActiveItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
