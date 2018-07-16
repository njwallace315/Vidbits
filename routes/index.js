const router = require('express').Router();
const Video = require('../models/video');
const url = require('url');

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

router.get('/:id/edit', async (req, res, next) => {
	const video = await Video.findById(req.params.id);
	res.render('edit', {video});
});


router.post('/:id/edit', async (req, res, next) => {
	const {title, description, videoUrl} = req.body;
	if(!title || !description || !videoUrl) {
		const err = {
			message: 'Please fill out all forms',
			status: 400,
		};
		const video = await Video.findById(req.params.id);
		res.status(err.status);
		res.render('edit', {err, video});
	} else {
		await Video.findByIdAndUpdate(req.params.id, {title, description, videoUrl});
	//similar to the issue in the create post route, the following line gets stuck
	//res.redirect(`/${req.params.id}`)
	const video = await Video.findById(req.params.id);
		res.status(302);
		res.render('show', {video});
	};
	
});

router.get('/:id/delete', async (req, res, next) => {
	await Video.findByIdAndRemove(req.params.id, (err) => {
		if (err) res.status(404).send();
	});
	res.redirect('/');
});

module.exports = router;
