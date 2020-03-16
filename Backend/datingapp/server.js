const express = require('express')
const app = express()
const port = 1900
const slug = require('slug')
const bodyParser = require('body-parser')
const mySearch = [];

// zorgt ervoor dat variable uit .env beschikbaar zijn
require('dotenv').config();
var db;
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
//var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT; // even hier laten voor de test

const url = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@datingapp-jarbx.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true });

// functie om met de database te connecten. maakt een variable db aan
client.connect((err, client) => {
  if (err) {
    console.log(err);
  }
  db = client.db(process.env.DB_NAME);

  // db.collection('profile').find().toArray(function (err, data){
  //   console.log(data);
  // }

  //client.close();
});


function movie(req, res) {
  // profile = await db.collection('profile').findOne({_id: ObjectId(req.params.id)});

  // console.log('PROFILE:', profile);

  // db.collection('profile').find().toArray(function (err, data) {
  //   const id = req.params.id
  //   const profile = data.filter(item => item.id === id)[0];
  //   res.render('result.ejs', profile);
  // })

  db.collection('profile').find(new ObjectID(req.params.id)).toArray(function (err, data) {
    console.log('DATA:', data);
    res.render('result.ejs', data[0]);
  })
}

//functie zodat movie wordt toegevoegd
function addMovie(req, res) {

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



//test voor de opdracht zonder dynamic data
//app.get('/', (req, res) => res.render('index.ejs'));

app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.post('/add-movie', addMovie);
app.get('/movie/:id', movie);

app.get('/', (req, res) => res.render('index.ejs', {title: 'Goedemiddag welkom jongens'}));
app.get('/error', (req, res) => res.status(404).render('index.ejs', {title: 'foutcode jongens'}));
//app.get('/', (req, res) => res.send('Joooo Jade!!!'))
app.get('/about', (req, res) => res.send('Dingen ABOUT me'))
app.get('/static', (req, res) => res.send())
app.get('/image', (req, res) => res.sendFile(__dirname + '/static/images/' + 'strand.jpg'))
app.get('/mp3', (req, res) => res.sendFile('/Users/Jade/Documents/School/CMD/Jaar2/Blok3/Backend-development/datingapp/horse.mp3'))
app.get('*', (req, res) => res.send('404 ERROR NOT FOUND'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
