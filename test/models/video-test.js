const {connectAndDrop, disconnect} = require('../setup-teardown-utils.js');
const Video = require('../../models/video');
const {assert} = require('chai');

describe('Model: Video', () => {
	beforeEach(connectAndDrop);
	afterEach(disconnect);

	describe('#all fields', () => {
		it('are required', () => {
			const video = new Video({});

			video.validateSync();

			assert.equal(video.errors.title.message, 'Path `title` is required.');
			assert.equal(video.errors.description.message, 'Path `description` is required.');
			assert.equal(video.errors.videoUrl.message, 'Path `videoUrl` is required.');
		});

		it('are strings', () => {
			const titleAsInt = 1;
			const descriptionAsInt = 1;
			const videoUrlAsInt = 1;

			const video = new Video({title: titleAsInt, description: descriptionAsInt, videoUrl: videoUrlAsInt});

			assert.strictEqual(video.title, titleAsInt.toString());
			assert.strictEqual(video.description, descriptionAsInt.toString());
			assert.strictEqual(video.videoUrl, videoUrlAsInt.toString());
		});
	});
});