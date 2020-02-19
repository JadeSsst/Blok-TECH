const express = require('express')
const app = express()
const port = 1900

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Joooo Jade!!!'))
app.get('/about', (req, res) => res.send('Dingen ABOUT me'))
app.get('*', (req, res) => res.send('404 ERROR NOT FOUND'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
