const express = require('express');
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
app.set("views", "./views")
app.set("view engine", "pug")
  