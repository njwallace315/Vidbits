const {assert} = require('chai');
const {connectAndDrop, disconnect} = require('../setup-teardown-utils.js')
const {parseTextFromHTML, seedVideoToDatabase} = require('../test-utils');
const request = require('supertest');
const app = require('../../app.js');

describe(`server path '/'`, () => {
	beforeEach(connectAndDrop);
	afterEach(disconnect);

	describe('GET', () => {
		it('renders videos in database', async () => {
			const video = await seedVideoToDatabase();

			const response = await request(app)
			.get('/');

			assert.include(parseTextFromHTML(response.text, 'body'), video.title);
		});
		
	});
});