const router = require('express').Router();
const data = require('../data/images');

router.get('/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	if (data[id]) {
		res.send(data[id]);
	} else {
		res.status(404).send({
			error: 'Image not found'
		});
	}
});

module.exports = router;