const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('user updates a video', () => {
	it('changes are rendered', () => {
		let video = buildVideoObject();
		browser.url('/create');

		browser.setValue('#title-input', video.title);
		browser.setValue('#description-input', video.description);
		browser.setValue('#videoUrl-input', video.videoUrl);
		browser.click('#submit-button');
		video.title = "Updated Title";
		// video._id = browser.getUrl().replace('localhost:4001/', '');
		// const tagId = '#edit-button-' + video._id;
		const tagId = '#edit-button';
		browser.click(tagId);
		browser.setValue('#title-input', video.title);
		browser.click('#submit-button');

		assert.include(browser.getText('body'), video.title);
		assert.include(browser.getText('body'), video.description);
	});
});