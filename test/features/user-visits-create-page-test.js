const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('user visits create', () => {
	describe('posts a new video', () => {
		it('renders the new video', () => {
			browser.url('/create');
			const video = buildVideoObject();
			
			browser.setValue('#title-input', video.title);
			browser.setValue('#description-input', video.description);
			browser.setValue('#videoUrl-input', video.videoUrl);
			browser.click('#submit-button');

			assert.include(browser.getText('body'), video.title);
			assert.include(browser.getAttribute('body iframe', 'src'), video.videoUrl);
		});
	});
});