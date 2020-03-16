### Looping
Loops herhalen een x aantal keer een stukje code tussen de accolades. Verschillende soorten loops: 
- **for loop**  
```js
for (i = 0; i < 5; i++) {
  text += "The number is " + i + "<br>";
}
```
- **for..of loop** --> met de 'for of' loop, loop je door de values van de objecten heen  
```js
for (variable of object)
  statement
 ```
- **for.. in loop** --> "The for..in loop provides a simpler way to iterate through the properties of an **object**." Met de 'for in' loop, loop je door de keys van de objecten heen   
``` js
for (variable in object)
  statement
 ```  
- **forEach loop**  
- **while loop** --> handig om te gebruiken voor alleen true en false. dus bijv als je iets uit een database haalt. gaat alleen als ie true is, dus als ie false is wordt ie over geslagen  
``` js
while (i < 10) {
  text += "The number is " + i;
  i++;
}
```
- **do..while loop** --> eerst gaat de uitvoering dus maakt niet uit of ie false is of niet, hij voert hem uit en daarna wordt pas aangegeven hoe vaak dit moet gebeuren  
``` js
do {
   statement(s);
} while( condition );
```


### Higher order function 
"A higher-order function is a function that either *takes a function as one of its parameters or *returns another function."  
Dus dat een functie een andere functie returnt. Een outerfunction en een innerfunction komen samen en heten dan een higher order function.  
***Voorbeeld:***
```js
function greaterThan(number) {
  return innerNumber => number . innerNumber;
}

greaterThan10 = greaterThan(10); 
gretertThan20 = greaterThan(20); 
greaterThan10(10); //returns true 
greaterThan20(12); // returns false

var user = { preverence: 21 }
greaterThan20(user.preverence); // returns true
// dit kan bijvoorbeeld gebruikt worden voor de dating app

```

### Progressive enhancement (voorbeeld)  
attribute anamaken op je html aanmaken voor je js gaat zo: **data-hamburger**. nu heb je dus een hamburger attribute aangemaakt voor in je js
```html
<!-- wat we nou eigenlijk doen is ondanks dat we de list (nav) aan de bovenkant van de pagina in de html zetten, op de pagina index.html krijg je door display flex en order hem toch onderaan de paigna -->
<div class="container">
<a class="hamburger" href='#'>Hamburger menu</a>
<nav>
  <ul>
    <li><a href='#'>item 1</a></li>
    <li><a href='#'>item 2</a></li>
    <li><a href='#'>item 3</a></li>
    <li><a href='#'>item 4</a></li>
  </ul>
</nav>
</div>
```
```css
.container {
  display: flex;
  fles-direction: column:
  max-width: 4-rem;
  margin: 0 auto;
}

nav {
  order: 1;
}

nav.js {
  position: fixed; // blijft kleven aan de bovenkant
  top: 0;
  left: 0;
  // position absolute zorgt ervoor dat je element uit de flow van de DOM gaat
  // position fixed linkt hem aan de viewport
}

ul {
  list-style-type: none;
}

.hamburger {
  align-self: flex-start; //zorgt ervoor dat ie niet de hele breedte pakt
}
```
``` js
var hamburger = document.querySelector('[data-hamburger]');
hamburger.addEventListener('click', function(event) {
  event.preventDefault(); //hiermee zorg je ervoor dat de klik niet doet wat in de html is gedeclareerd
}

#### Bronnen  
https://www.freecodecamp.org/news/the-complete-guide-to-loops-in-javascript-f5e242921d8c/  
Stof in de les behandeld  
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for...in_statement  
https://medium.com/@js_tut/higher-order-functions-in-javascript-732dc7a1952d
