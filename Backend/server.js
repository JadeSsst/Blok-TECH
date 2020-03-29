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

adjust.addEventListener('click', update);

function update(req, res) {
  res.render('index.ejs')
  console.log("naar andere pagina");
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

//voorbeeld
app.get('/add-data', insertData);
//voorbeeld
function insertData(req, res) {
  db.collection('test').insertOne(
    { name: 'Randy'},
    (err, result) => {
      if (err) throw err;
      res.status(200).send('YAAAAAAY');
    })

}

//voorbeeld
app.get('/update-data', findAndUpdateData);
//voorbeeld
function findAndUpdateData(req, res) {
  db.collection('test').findOne(
    { name: 'Randy' },                //property waar je op zoekt
    (err, result) => {               // mongodb callback
      if (err) throw err;
      const id = result._id;        // id van object die we net hebben aangemaakt

      updateData(id, () => {
        res.status(200).send('Yay geupdate');
      });
    })
  }



function updateData(id, callback) {
  // voorbeeld voor als je met formulier doet: const data = req.body.data
  db.collection('test').updateOne(    // van mongodb
  {_id: ObjectID(id) },               // 1. waar je op zoekt
  { $set: {title: 'bye!' } },         // 2. property dieje wil aanpassen via set
  (err, result) => {                  // 3.
    if (err) throw err;

    callback()
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
app.post('/add-movie', addFilter);
app.get('/movie/:id', results);
app.get('/', (req, res) => res.render('index.ejs'));
app.get('*', (req, res) => res.send('404 ERROR NOT FOUND - made by meeeeee'))

// listen als laatste, dit is op welke port de local host draait
app.listen(port, () => console.log(`Example app listening on port ${port}!`))