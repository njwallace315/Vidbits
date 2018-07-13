const router = require('express').Router();
const Video = require('../models/video');

router.get('/', async (req, res, next) => {
	const videos = await Video.find({});
	res.render('index', {videos});
});

router.get('/create', async (req, res, next) => {
	res.render('create');
});

router.post('/create', async (req, res, next) => {
	const {title, description, videoUrl} = req.body;
	const video = await Video.create({title, description, videoUrl}, (err) => {
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
	
	res.redirect(`/${video._id}`);
});

router.get('/:id', async (req, res, next) => {
	const video = await Video.findById(req.params.id);
	res.render('show', {video});
});

router.get('/:id/delete', async (req, res, next) => {
	await Video.findByIdAndRemove(req.params.id, (err) => {
		if (err) res.status(404).send();
	});
	res.redirect('/');
});

module.exports = router;
