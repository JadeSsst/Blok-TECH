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
var db;
var session = require('express-session')

// functie om met de database te connecten
client.connect((err, client) => {
  if (err) {
    console.log(err);
  }
  db = client.db(process.env.DB_NAME);
});

// functie om de aangeklikte filteropties die in de database gestopt zijn, weer terug te renderen op een de pagina
function movie(req, res) {
  db.collection('profile').find(new ObjectID(req.params.id)).toArray(function (err, data) {
    console.log(data);
    res.render('result.ejs', data[0]);
  })
}

// functie zodat de geselecteerde filteropties worden onthouden en in een database collection worden gestopt
function addMovie(req, res) {
  // const id = slug(req.body.username).toLowerCase()
  const result = db.collection('profile').insertOne({
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

app.post('/add-movie', addMovie);
app.get('/movie/:id', movie);
app.get('/', (req, res) => res.render('index.ejs'));
app.get('*', (req, res) => res.send('404 ERROR NOT FOUND - made by meeeeee'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
