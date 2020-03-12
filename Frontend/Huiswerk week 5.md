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

### progressive enhancement (voorbeeld)  
