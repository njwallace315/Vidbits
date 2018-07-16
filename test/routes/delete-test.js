const {seedVideoToDatabase, parseTextFromHTML} = require('../test-utils');
const {connectAndDrop, disconnect} = require('../setup-teardown-utils.js');
const {assert} = require("chai");
const request = require('supertest');
const app = require('../../app.js');

describe('Server route /:id/delete', () => {
	beforeEach(connectAndDrop);
	afterEach(disconnect);

	describe('POST', () => {
		it('removes item', async () => {
			const video = await seedVideoToDatabase();

			const response = request(app)
			.post(`/${video._id}/delete`)
			
			assert.notInclude(parseTextFromHTML(response.text, 'body'), video.title);
		});
	});
});