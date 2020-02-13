### Eloquent JavaScript - Binding and Scope
> Each binding has a scope, which is the part of the program in which the binding is visible. For bindings defined outside of any function or block, the scope is the whole program—you can refer to such bindings wherever you want. These are called global.

- let en const kunnen feitelijk alleen in heet block waarin ze gedecladeerd zijn  
- Each scope can “look out” into the scope around it

=> en function zijn hetzelfde. => kan je dan schrijven als: const power = (base, lksd) => {}. arrow komt na de list van parameters

Belangrijk dat je oplet hoeveel arguments je hebt en dat je er niet te weinig geeft want anders komt er undefined.  
teveel is wel mogelijk, dan negeerrt js gewoon de extra's

>A function that calls itself is called recursive.

We’ve seen that % (the remainder operator) can be used to test whether a number is even or odd by using % 2

### You Don't Know JS - Block scope
functie in een functie  
Global scope = All scripts and functions on a web page can access it.  
local scope = function scope: They can only be accessed from within the function.

### Mozilla Developer Network - Hoisting
Eigenlijk is dit het volgende:  
**the variable and function declarations are put into memory during the compile phase, but stay exactly where you typed them in your code.**

Wanneer je eerst de functie aanroept voordat deze geschreven is, werkt het alsnog, dat is hoisting.

### Fun Fun Function - Closures
functies zijn niet alleen functies, dit zijn ook closures. Dit betekent dat functies ook toegang hebben tot variabelen buiten de functie.  
--> dus dat je iets aan kunt roepen. Heeft eigenlijk ook beetje te maken dus met scope.




