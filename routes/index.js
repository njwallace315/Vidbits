const router = require('express').Router();
const Item = require('../models/video');

router.get('/', async (req, res, next) => {
	const items = await Item.find({});
	res.render('index', {items});
});

router.get('/videos/create', async (req, res, next) => {
	res.render('videos/create');
});

router.post('/videos/create', async (req, res, next) => {
	const {title, description, videoUrl} = req.body;
	// console.log('**************************')
	// console.log('title: ', title);
	// console.log('description: ', description);
	// console.log('videoUrl: ', videoUrl);
	// console.log('**************************')
	const item = await Item.create({title, description, videoUrl}, (err) => {
		if (err) { 
			res.status(400).send(); 
		};
	});
	//the following commented out line gets stuck on a page that disoplays "redirecting to '/' "
	//res.redirect(201, 'index');
	res.redirect('/');
});

module.exports = router;
