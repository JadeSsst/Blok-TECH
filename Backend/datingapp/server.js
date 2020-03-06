const express = require('express')
const app = express()
const port = 1900
const slug = require('slug')
const bodyParser = require('body-parser')
const mySearch = [];

app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.post('/add-movie', addMovie);
app.get('/movie/:id', movie);


function movie(req, res) {
  const id = req.params.id;
  //filtert de array en zoekt het item dat de id matcht
  const movie = mySearch.filter(item => item.id === id) [0];
  res.render('result.ejs', movie)
}
//functie zodat movie wordt toegevoegd
function addMovie(req, res) {
  console.log(req.body);
  var id = slug(req.body.geslacht).toLowerCase()

  mySearch.push({
  id: id, //altijd nodig, id is van de server wel
  geslacht: req.body.geslacht,
  leeftijd: req.body.leeftijd,
  afstand: req.body.afstand,
  roken: req.body.roken,
  kinderen: req.body.kinderen,
  lengte: req.body.lengte,
  })

  res.redirect('/movie/' + id)
}



//test voor de opdracht zonder dynamic data
//app.get('/', (req, res) => res.render('index.ejs'));

app.get('/', (req, res) => res.render('index.ejs', {title: 'Goedemiddag welkom jongens'}));
app.get('/error', (req, res) => res.status(404).render('index.ejs', {title: 'foutcode jongens'}));
//app.get('/', (req, res) => res.send('Joooo Jade!!!'))
app.get('/about', (req, res) => res.send('Dingen ABOUT me'))
app.get('/static', (req, res) => res.send())
app.get('/image', (req, res) => res.sendFile(__dirname + '/static/images/' + 'strand.jpg'))
app.get('/mp3', (req, res) => res.sendFile('/Users/Jade/Documents/School/CMD/Jaar2/Blok3/Backend-development/datingapp/horse.mp3'))
app.get('*', (req, res) => res.send('404 ERROR NOT FOUND'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
