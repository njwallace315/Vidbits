const {assert} = require('chai');
const {connectAndDrop, disconnect} = require('../setup-teardown-utils.js')
const {buildVideoObject} = require('../test-utils');
const request = require('supertest');
const app = require('../../app.js');

describe('server path /videos/create', () => {
	beforeEach(connectAndDrop);
	afterEach(disconnect);

	describe('POST', () => {
		it('sends 302 on sucessful creation and redirection', async () => {
			const video = buildVideoObject();

			const response = await request(app)
			.post('/videos/create')
			.type('form')
			.send(video);

			assert.equal(response.status, 302);

		});
		it('returns error code 400 with bad request', async () => {
			const video = buildVideoObject();
			video.title = '';
			const response = await request(app)
			.post('/videos/create')
			.type('form')
			.send(video);

			assert.equal(response.status, 400);

		});
	});
});