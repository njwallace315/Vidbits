const {assert} = require('chai');

describe('user visits root', () => {
	describe('with no existing vieos', () => {
		it('videos container is empty', () => {
			browser.url('/')

			assert.equal(browser.getText('#videos-container'), '');
		});
	});
});
