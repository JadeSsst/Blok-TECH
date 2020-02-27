## In klas behandeld
### Recursion
Recursion moet voldoen aan 2 regels: 
- een call naar zichzelf (dus herhaalt zichzelf)
- end state/condition hebben

voorbeeld recursive function
```js
function recur(data, tries) {
  if(tries == 10) {
    return data;
  }
  if(!data) {
  data = [];
  }
  data.push(tries);
  return recur(data, tries+1);
}
```
Een goed idee bij recursive functies is uittekenen wat je nou precies wil doen. Dit zorgt voor het overzicht.
![IMG_0947](https://user-images.githubusercontent.com/24520560/75431950-ebb3bb80-594d-11ea-9c9a-b5f6c610bf8e.JPG)



