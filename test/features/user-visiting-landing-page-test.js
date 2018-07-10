const {assert} = require('chai');

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
});
