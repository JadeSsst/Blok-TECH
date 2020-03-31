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
  db.collection('filtersTwee').find(new ObjectID(req.params.id)).toArray(function (err, data) {
    console.log(req.params.id);
    console.log(data);
    res.render('result.ejs', {id: req.params.id, data: data[0]});
  })
}

// functie zodat de geselecteerde filteropties worden onthouden en in een database collection worden gestopt
function addFilter(req, res) {
  const result = db.collection('filtersTwee').insertOne({
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

app.get('/adjust-filters/:id', update);
// functie die wanneer er op 'pas aan' geklikt wordt, de update pagina laat zien met de juiste id in de url
function update(req, res) {
  res.render('update.ejs', {id: req.params.id});
  console.log(req.params.id);
}

app.post('/update-filters/:id', findAndUpdateData);
// functie die ervoor zorgt dat juiste id wordt gevonden en die dan de functie updateData aanroept
function findAndUpdateData(req, res) {
  console.log("HEX 24 " + req.params.id);
  db.collection('filtersTwee').findOne(
   {_id: ObjectID(req.params.id)},
    (err, result) => {
    if (err) throw err;
    const id = result._id;                            t

    updateData(id, () => {
      res.redirect('/movie/' + id);
    });
  })
}

// function findAndUpdateData(req, res) {
//   db.collection('filters').find(new ObjectID(req.params.id),(err,result) => {
//     console.log(req.params.id);
//     if (err) throw err;
//     const id= result._id;
//     res.redirect('/movie/' + id);
//   })
// }

// functie die de nieuwe info koppelt aan de data en update
function updateData(req, res) {
  db.collection('filtersTwee').updateOne(
    {_id: ObjectID(req.params.id)},
    { $set: {
      geslacht: req.body.geslacht,
      leeftijd: req.body.leeftijd,
      afstand: req.body.afstand,
      roken: req.body.roken,
      kinderen: req.body.kinderen,
      lengte: req.body.lengte, }},
    (err) => {
        if (err) throw err;
  })
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
app.post('/update-filters', findAndUpdateData);
app.post('/add-movie', addFilter);
app.get('/movie/:id', results);
app.get('/', (req, res) => res.render('index.ejs'));
app.get('*', (req, res) => res.send('404 ERROR NOT FOUND - made by meeeeee'))

// listen als laatste, dit is op welke port de local host draait
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
