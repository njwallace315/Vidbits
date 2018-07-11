const router = require('express').Router();
const Video = require('../models/video.js');

router.get('/', (req, res, next) => {
	res.render('index');
});

router.get('/videos/create', (req, res, next) => {
	res.render('/videos/create');
});

// router.post('/videos/create', async (req, res, next) => {
// 	const {title, description, videoUrl} = req.body;
// 	const item = await Video.create({title, description, videoUrl}, (err) => {
// 		if (err) res.status(400).send();
// 	});
// 	res.redirect('/')	
// });

module.exports = router;