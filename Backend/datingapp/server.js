// zorgt ervoor dat variabelen uit .env beschikbaar zijn
require('dotenv').config();

// constante variabelen aanmaken
const express = require('express')
const app = express()
const port = 1900
const slug = require('slug')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const session = require('express-session')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@datingapp-jarbx.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true });
var db;

// static folders + views voor ejs + bodyparser + sessions
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  }))

// routes bepalen
app.post('/add-filter', addFilter);
app.post('/update-filters/:id', findAndUpdateData);
app.get('/filter/:id', results);
app.get('/adjust-filters/:id', update);
app.get('/new-filter/:id', destroy);
app.get('/', (req, res) => res.render('index.ejs'));
app.get('*', (req, res) => res.send('404 ERROR NOT FOUND - made by meeeeee'))

// functie om met de database te connecten
client.connect((err, client) => {
  if (err) {
    console.log(err);
  }
  db = client.db(process.env.DB_NAME);
});

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
    res.redirect('/filter/' + result.insertedId);
  });
}

// functie om de aangeklikte filteropties die in de database gestopt zijn, weer terug te renderen op een nieuwe pagina
function results(req, res) {
  db.collection('filters').find(new ObjectID(slug(req.params.id))).toArray(done)
  function done(err, data) {
    if (err) throw err;
    console.log(data);
    res.render('result.ejs', {id: req.params.id, data: data[0]})
  }
}

// functie die wanneer er op 'pas filters aan' geklikt wordt, de update pagina laat zien met de juiste id in de url
// functie zorgt ook voor de sessions van pageview
function update(req, res) {
  if(req.session.views) {
      req.session.views++;
      console.log("Je hebt deze pagina al " + req.session.views + " keer bekeken");
    if(req.session.views == 4) {
      console.log("Aantal keer filteren heeft de max bereikt");
      res.render('cookie.ejs', {id: req.params.id});
    } else {
      res.render('update.ejs', {id: req.params.id});
    }} else if(true) {
      req.session.views = 1;
      console.log("Deze pagina zie je nu voor de eerste keer");
      res.render('update.ejs', {id: req.params.id});
  }
}

// functie die ervoor zorgt dat juiste id wordt gevonden en daarna de gegevens in de database udpate
function findAndUpdateData(req, res){
	db.collection('filters').updateOne(
		{_id: new ObjectID(slug(req.params.id))},
		{$set:
      { geslacht: req.body.geslacht,
      leeftijd: req.body.leeftijd,
      afstand: req.body.afstand,
      roken: req.body.roken,
      kinderen: req.body.kinderen,
      lengte: req.body.lengte
    }}, function(err) {
			if (err) throw err;
      console.log("Gegevens zijn geupdate");
			res.redirect('/filter/' + req.params.id);
		})
}

// functie voor destroyen van de cookies
function destroy(req, res) {
  req.session.destroy(function (err) {
    if (err) throw err;
    console.log("Sessions zijn destroyd, kunnen weer opnieuw beginnen");
    res.render('update.ejs', {id: req.params.id});
  })
}

// listen als laatste, dit is op welke port de local host draait
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
