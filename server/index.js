const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const imageRoute = require('./routes/image');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/image', imageRoute);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}!`));