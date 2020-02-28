const express = require('express')
const app = express()
const port = 1900

app.use('/static', express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', 'views');

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
