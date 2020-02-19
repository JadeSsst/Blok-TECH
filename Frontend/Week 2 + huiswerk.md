## In-class exercises
Tijdens de les heb ik ondezoek gedaan naar progressive enhancement zodat wij als klas een beter beeld zouden krijgen over wat progressive enhancement nou precies is. 

> Progressive enhancement is a strategy for web design that emphasizes core web page content first. This strategy then progressively adds more nuanced and technically rigorous layers of presentation and features on top of the content as the end-user’s browser/Internet connection allow. — Wikipedia

Oftewel, progressive enhancement zorgt voor een leukere beleving van de website. Progressive enhancement geeft meer vorm aan de website, bepaalde features komen beter tot zijn recht en de site ziet er beter uit. De kans is dan ook groot dat wanneer een website geen  of weinig progressive enhancement heeft toegepast, dat de website er dan ook erg statig uit ziet.

## Homework
#### Chapter 13: JavaScript And The Browser
Zonder browsers zou er geen javascript zijn. Computer netwerken zijn er al sinds de jaren 50, maar veel minder geoptimaliseerd dan nu. In 1980 kwam de ontdekking dat het ook mogelijk was om computers met elkaar te kunnen laten communiceren en zo ontstond het internet. 

Een netwerk protocal beschrijft de stijl van communicatie over een netwerk. We hebben _Hypertext Transfer Protocol (HTTP)_, dit is een protocol voor het ophalen van bronnen, oftewel webpagina's. 

_Transmission Control Protocol (TCP)_ is een protocol dat het probleem verhelpt wat verschijnt wanneer protocollen worden gebouwd op andere protocollen. 

World wide web is niet hetzelfde als het internet. 
>The “Web” part in the name refers to the fact that such pages can easily link to each other

Een IP adres is een nummer dat gebruikt wordt wanneer jij gebruikt maakt van het internet. Met dit nummer worden berichten naar de machine gestuurd. 

HTML, hypertext markup language wordt gebruikt voor het bouwen van een webpagina. HTML werkt samen met javascript.

In de beginfases van het web domineerde de browser Mosaic het web. Daarna werd microsoft internet explorer een van de grooste. Door de jaren heen is er een _browswer war_ geweest: er werden de hele tijd nieuwe browsers ontwikkeld.

#### Chapter 14: The Document Object Model

```html
<h1>Heading with a <span>span</span> element.</h1>
<p>A paragraph with <span>one</span>, <span>two</span>
  spans.</p>

<script>
  function byTagName(node, tagName) {
    if (node.nodeType == Node.ELEMENT_NODE) {
      for (let i = 0; i < node.childNodes.length; i++) {
        if (byTagName(node.childNodes[i], tagName)) {
          return true;
        }
    }
    return false;
  } else if (node.nodeType == Node.TEXT_NODE) {
    return node.nodeValue.indexOf(tagName) > -1;
  }
 }

  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  let para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2
</script>
```

##### Bronnen
https://www.freecodecamp.org/news/what-is-progressive-enhancement-and-why-it-matters-e80c7aaf834a/  
https://fronteers.nl/blog/2015/05/ontwikkelen-met-progressive-enhancement  
https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/  
