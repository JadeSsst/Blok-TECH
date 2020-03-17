// zorgt ervoor dat variable uit .env beschikbaar zijn
require('dotenv').config();

// constante variabelen aanmaken
const express = require('express')
const app = express()
const port = 1900
const slug = require('slug')
const bodyParser = require('body-parser')
const mySearch = [];
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@datingapp-jarbx.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true });
const session = require('express-session')
var db;

// functie om met de database te connecten
client.connect((err, client) => {
  if (err) {
    console.log(err);
  }
  db = client.db(process.env.DB_NAME);
});

// functie om de aangeklikte filteropties die in de database gestopt zijn, weer terug te renderen op een nieuwe pagina
function results(req, res) {
  db.collection('filters').find(new ObjectID(req.params.id)).toArray(function (err, data) {
    console.log(data);
    res.render('result.ejs', data[0]);
  })
}

// functie zodat de geselecteerde filteropties worden onthouden en in een database collection worden gestopt
function addFilter(req, res) {
  const result = db.collection('filters').insertOne({
    geslacht: req.body.geslacht,
    leeftijd: req.body.leeftijd,
    afstand: req.body.afstand,
    roken: req.body.roken,
    kinderen: req.body.kinderen,
    lengte: req.body.lengte,
  }, function (err, result) {
    res.redirect('/movie/' + result.insertedId);
  });
}

// routes bepalen + static folders + views voor ejs
app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  }))
app.post('/add-movie', addFilter);
app.get('/movie/:id', results);
app.get('/', (req, res) => res.render('index.ejs'));
app.get('*', (req, res) => res.send('404 ERROR NOT FOUND - made by meeeeee'))

// oude routes die ik eerder in dit project gebruikt heb, staan er in ter illustratie van mijn voortgang en oefening
app.get('/', (req, res) => res.render('index.ejs'));
app.get('/image', (req, res) => res.sendFile(__dirname + '/static/images/' + 'strand.jpg'))
app.get('/mp3', (req, res) => res.sendFile('/Users/Jade/Documents/School/CMD/Jaar2/Blok3/Backend-development/datingapp/horse.mp3'))
app.get('/', (req, res) => res.render('index.ejs', {title: 'Goedemiddag welkom jongens'}));
app.get('/error', (req, res) => res.status(404).render('index.ejs', {title: 'foutcode jongens'}));
app.get('/', (req, res) => res.send('Joooo Jade!!!'))
app.get('/about', (req, res) => res.send('Dingen ABOUT me'))
app.get('/static', (req, res) => res.send())

// listen als laatste, dit is op welke port de local host draait
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
