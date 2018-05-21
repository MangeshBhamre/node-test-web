const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

console.log('Starting web server');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
app.set('view engine','hbs');

app.use((req, res, next) => {

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n' , (err) => {
		if (err) {
			console.log('Unable to append to log file');
		}
	});
	next();
});

//app.use((req, res, next) => {
//
//	res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {

	response.send({
		name:'Mangesh',
		age: 42});
});

app.get('/about', (request, response) => {
	response.render('about.hbs', { pageTitle:'Mangesh' 
				 	});
});

app.listen(port);
