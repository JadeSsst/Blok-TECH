/* eslint-env browser */
const sliders = document.querySelectorAll('.sliders');

Array.prototype.forEach.call(sliders,(slider) =>{
  slider.querySelector('input').addEventListener('input', (event) =>{
    slider.querySelector('span').innerHTML = event.target.value;
  });
});
