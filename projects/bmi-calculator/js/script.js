// inputs
const rangeWeight = document.getElementById('rangeWeight');
const rangeHeight = document.getElementById('rangeHeight');
const switchGender = document.getElementById('switchGender');

// results
const resultValue = document.getElementById('resultValue');
const restulState = document.getElementById('resultState');

// calculate btn
const calculateBtn = document.getElementById('calculateBmi');

// event
calculateBtn.addEventListener('click', function () {
  const weight = +rangeWeight.value;
  const height = +rangeHeight.value / 100;
  const gender = switchGender.checked ? 'male' : 'female';

  const bmi = weight / height ** 2;

  // result value
  resultValue.innerHTML = bmi.toFixed(2);

  // remove last active state
  const lastState = restulState.querySelector('.active');

  if (lastState) lastState.classList.remove('active');

  // result state
  let state;

  if (bmi <= 18.5) {
    state = 'underWeight';
  } else if (18.5 < bmi && bmi <= 24.9) {
    state = 'normal';
  } else if (25 <= bmi && bmi <= 29.9) {
    state = 'overWeight';
  } else if (30 <= bmi && bmi <= 34.9) {
    state = 'fat';
  } else if (35 <= bmi) {
    state = 'veryFat';
  }

  // add new active state
  const activeState = document.getElementById(state);

  if (activeState) activeState.classList.add('active');
});
