/* eslint-env browser */
const sliders = document.querySelectorAll('.sliders');

Array.prototype.forEach.call(sliders,(slider) =>{
  slider.querySelector('input').addEventListener('input', (event) =>{
    slider.querySelector('span').innerHTML = event.target.value;
  });
});

// const filterButton = document.querySelector('button');
// const section = document.querySelector('section');
// const extraFilters = document.querySelector(".extra");
// const basicFilters = document.querySelector(".basics");
// const titel = document.querySelector('h1');
//
// section.classList.add('away');
// extraFilters.classList.add('away');
// basicFilters.classList.add('away');
// titel.classList.add('away');
//
//
// filterButton.addEventListener('click', function() {
//   event.preventDefault();
//   section.classList.toggle('apear');
//   filterButton.classList.toggle('away');
//   extraFilters.classList.toggle('apear');
//   basicFilters.classList.toggle('apear');
//   titel.classList.toggle('apear');
//   console.log("geklikt");
// })
