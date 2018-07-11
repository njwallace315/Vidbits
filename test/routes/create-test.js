const {assert} = require('chai');
const {connectAndDrop, disconnect} = require('../setup-teardown-utils.js')
const {buildVideoObject} = require('../test-utils');
const request = require('supertest');
const app = require('../../app.js');

describe('server path /videos', () => {
	beforeEach(connectAndDrop);
	afterEach(disconnect);

	describe('POST', () => {
		it('responds with status code 201', async () => {
			const video = buildVideoObject;

			const response = await request(app)
				.post('/videos')
				.type('form')
				.send({video});

			assert.equal(response.status, 201);

		});
	});
});