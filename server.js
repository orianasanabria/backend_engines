const express = require('express');
const handlebars = require('express-handlebars')
const path = require('path');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000);

// Router
app.use(require('./routes'))

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Start Server
app.listen(app.get('port'), () => {
	console.log(`Server on Port ${app.get('port')}`)
})

// Engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
  })
)

app.set("views", "./views")
app.set("view engine", "hbs")