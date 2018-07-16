const {assert} = require('chai');
const {connectAndDrop, disconnect} = require('../setup-teardown-utils.js')
const {parseTextFromHTML, seedVideoToDatabase, buildVideoObject} = require('../test-utils');
const request = require('supertest');
const app = require('../../app.js');

describe(`server path /:id/edit`, () => {
	beforeEach(connectAndDrop);
	afterEach(disconnect);

	describe('GET', () => {
		it('renders the edit page', async () => {
			const video = await seedVideoToDatabase();

			const response = await request(app)
				.get(`/${video._id}/edit`);

			assert.include(parseTextFromHTML(response.text, 'body'), 'Edit Video');
		});
		it('pre-populates fields with existing values', async () => {
			const video = await seedVideoToDatabase();

			const response = await request(app)
				.get(`/${video._id}/edit`);

			assert.include(parseTextFromHTML(response.text, 'body'), video.description);
		});
	});

	describe('POST', () => {
		it('renders changes on successful insertion', async () => {
			let video = await seedVideoToDatabase();
			const response = await request(app)
				.post(`/${video._id}/edit`)
				.type('form')
				.send({title: 'Updated title', description: video.description, videoUrl: video.videoUrl});

			assert.include(parseTextFromHTML(response.text, 'body'), 'Updated title');
			assert.equal(response.status, 302);
		});
		it('re-loads page if missing fields', async () => {
			let video = await seedVideoToDatabase();
			const response = await request(app)
				.post(`/${video._id}/edit`)
				.type('form')
				.send({title: '', description: video.description, videoUrl: video.videoUrl});

			assert.include(parseTextFromHTML(response.text, 'body'), 'Please fill out all forms');
			assert.equal(response.status, 400);
		});
	});
});