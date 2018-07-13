const {assert} = require('chai');
const {connectAndDrop, disconnect} = require('../setup-teardown-utils.js')
const {parseTextFromHTML, seedVideoToDatabase, buildVideoObject} = require('../test-utils');
const request = require('supertest');
const app = require('../../app.js');
const {jsdom} = require('jsdom');

describe(`server path '/:id'`, () => {
	beforeEach(connectAndDrop);
	afterEach(disconnect);

	describe('GET', () => {
		it('renders the video', async () => {
			const video = await seedVideoToDatabase();

			const response = await request(app) 
				.get(`/${video._id}`);

			assert.include(parseTextFromHTML(response.text, 'body'), video.description);
			const element = jsdom(response.text).querySelector(`iframe[class="video-player"]`);
			assert.equal(element.src, video.videoUrl);
		});
	});

	describe('POST', () => {
		it('redirects to show', async () => {
			const video = buildVideoObject();

			const response = await request(app)
				.post('/create')
				.type('form')
				.send(video);

			//const element = jsdom(response.text).querySelector('div[id="video-title"]');	
			assert.equal(response.status, 302);
		});
	});
});