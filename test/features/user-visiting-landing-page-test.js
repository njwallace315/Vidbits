const {assert} = require('chai');
const {buildVideoObject, seedVideoToDatabase} = require('../test-utils')

describe('user visits root', () => {
	describe('with no existing vieos', () => {
		it('videos container is empty', () => {
			browser.url('/')

			assert.equal(browser.getText('#videos-container'), '');
		});
	});
	describe('clicks create button', () => {
		it('navigates to create.html', () => {
			browser.url('/');

			browser.click('#create-button')

			assert.include(browser.getText('body'), 'Save a video');
		});
	});

	describe('with existing video', () => {
		it('video is rendered in index', () => {
			browser.url('/create');
			let video = buildVideoObject();

			browser.setValue('#title-input', video.title);
			browser.setValue('#description-input', video.description);
			browser.setValue('#videoUrl-input', video.videoUrl);
			browser.click('#submit-button');
			browser.url('/');

			assert.include(browser.getText('body'), video.title);
			assert.include(browser.getAttribute('body iframe', 'src'), video.videoUrl);
		});

		describe('clicks video title', () => {
			it('navigates to single video page', () => {
				browser.url('/create');
				let video = buildVideoObject();

				browser.setValue('#title-input', video.title);
				browser.setValue('#description-input', video.description);
				browser.setValue('#videoUrl-input', video.videoUrl);
				browser.click('#submit-button');
				browser.url('/');

				browser.click('#view-button');

				assert.include(browser.getText('body'), video.title);
				assert.include(browser.getAttribute('body iframe', 'src'), video.videoUrl);
				assert.include(browser.getText('body'), video.description);
			});
		});
	});
});
