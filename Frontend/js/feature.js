// Jade Schreuder
const sliders = document.querySelectorAll('.sliders');

// function to show the actual numbers from the sliders
sliders.forEach(slider => {
  slider.querySelector('input').addEventListener('input', (event) => {
    slider.querySelector('span').innerHTML = event.target.value;
  });
});

// Const declarations
const filterButton = document.querySelector('button');
const section = document.querySelector('section');
const extraFilters = document.querySelector('.extra');
const basicFilters = document.querySelector('.basics');
const titel = document.querySelector('h1');
const searchButton = document.querySelector('.zoek');
const next = document.querySelector('.next');

// Adding classes to elements
// searchButton.classList.add('away');
section.classList.add('away');
extraFilters.classList.add('away');
basicFilters.classList.add('away');
titel.classList.add('away');

// function for 'when button is clicked'
filterButton.addEventListener('click', function() {
  event.preventDefault();
  section.classList.toggle('apear');
  filterButton.classList.toggle('away');
  // extraFilters.classList.toggle('apear');
  basicFilters.classList.toggle('apear');
  titel.classList.toggle('apear');
  console.log('geklikt');
})

// function for when the first part of the form is filled in
next.addEventListener('click', function() {
  event.preventDefault();
  console.log('klikkerdeklik');
  section.classList.remove('away');
  extraFilters.classList.toggle('apear');
  section.classList.toggle('length');
})

// Call function showButton()
showButton();

// function showButton() for having buttons checked at the start
function showButton() {
  const test = document.querySelector('input[id=man]');
  test.checked = true;
  const tesT = document.querySelector('input[id=nosmoke]');
  tesT.checked = true;
  const tesTT = document.querySelector('input[id=okaykids]');
  tesTT.checked = true;
}
