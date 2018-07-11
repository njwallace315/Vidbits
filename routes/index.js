const router = require('express').Router();
const Video = require('../models/video.js');

router.get('/', (req, res, next) => {
	res.render('/index.html');
});

module.exports = router;