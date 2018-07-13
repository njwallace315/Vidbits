const {assert} = require('chai');
const {connectAndDrop, disconnect} = require('../setup-teardown-utils.js')
const {buildVideoObject, parseTextFromHTML} = require('../test-utils');
const request = require('supertest');
const app = require('../../app.js');
const {jsdom} = require('jsdom');

describe('server path /videos/create', () => {
	beforeEach(connectAndDrop);
	afterEach(disconnect);

	describe('POST', () => {
		it('sends 302 on sucessful creation and redirection', async () => {
			const video = buildVideoObject();

			const response = await request(app)
			.post('/create')
			.type('form')
			.send(video);

			assert.equal(response.status, 302);

		});
		it('returns error code 400 with bad request', async () => {
			const video = buildVideoObject();
			video.title = '';
			
			const response = await request(app)
			.post('/create')
			.type('form')
			.send(video);

			assert.equal(response.status, 400);

		});
		it('re-renders create form on bad request', async () => {
			const video = buildVideoObject();
			video.title = '';
			
			const response = await request(app)
			.post('/create')
			.type('form')
			.send(video);

			assert.include(parseTextFromHTML(response.text, 'body'), 'Save a video');
		});
		it('displays error message on bad request', async () => {
			const video = buildVideoObject();
			video.title = '';
			
			const response = await request(app)
			.post('/create')
			.type('form')
			.send(video);

			assert.include(parseTextFromHTML(response.text, 'body'), 'Could not find title input');
		});
		it('entered values presist on bad request', async () => {
			const video = buildVideoObject();
			video.title = '';
			
			const response = await request(app)
			.post('/create')
			.type('form')
			.send(video);

			let element = jsdom(response.text).querySelector('input[id="title-input"]');
			assert.equal(element.value, video.title);
			assert.include(parseTextFromHTML(response.text, 'textarea'), video.description);
			element = jsdom(response.text).querySelector('input[id="videoUrl-input"]');
			assert.equal(element.value, video.videoUrl);
		});
	});
});