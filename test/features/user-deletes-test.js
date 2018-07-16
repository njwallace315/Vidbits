const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('user visits single item page', () => {
	describe('clicks delete', () => {
		it('removes video and redirects to root', () => {
			browser.url('/create');
			let video = buildVideoObject();

			browser.setValue('#title-input', video.title);
			browser.setValue('#description-input', video.description);
			browser.setValue('#videoUrl-input', video.videoUrl);
			browser.click('#submit-button');
			browser.url('/');

			browser.click('#video-title');
			browser.click('#delete-button');

			assert.notInclude(browser.getText('body'), video.title);
			assert.include(browser.getText('body'), 'Add new video');
		});

	});
});