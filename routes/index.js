const router = require('express').Router();
const Video = require('../models/video');

router.get('/', async (req, res, next) => {
	const items = await Video.find({});
	res.render('index', {items});
});

router.get('/create', async (req, res, next) => {
	res.render('create');
});

router.post('/create', async (req, res, next) => {
	const {title, description, videoUrl} = req.body;
	// console.log('**************************')
	// console.log('title: ', title);
	// console.log('description: ', description);
	// console.log('videoUrl: ', videoUrl);
	// console.log('**************************')
	const item = await Video.create({title, description, videoUrl}, (err) => {
		if (err) {
			if (!title) err.noTitleMessage = 'Could not find title input';
			if (!description) err.noDescriptionMessage = 'Could not find description input';
			if (!videoUrl) err.noVideoUrlMessage = 'Could not find videoUrl input';  
			res.status(400);

			res.render('create', {err, title, description, videoUrl});
		};
	});
	//the following commented out line gets stuck on a page that disoplays "redirecting to '/' "
	//res.redirect(201, 'index');
	res.redirect('/');
});

module.exports = router;
