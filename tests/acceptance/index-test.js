import { afterEach, beforeEach, describe, it } from 'mocha';
import { assert, expect } from 'chai';
import startApp from 'anfema/tests/helpers/start-app';
import destroyApp from 'anfema/tests/helpers/destroy-app';
import { click, find, findAll } from 'ember-native-dom-helpers';

describe('Acceptance | index', function () {
	let application;

	beforeEach(async function () {
		application = startApp();
		await visit('/');
	});

	afterEach(function () {
		destroyApp(application);
	});

	it('can visit /index', function () {
		expect(currentURL()).to.equal('/');
	});

	it('renders content items correctly', async function () {
		// all content items visible
		expect(find('[data-test-content-link-concept]')).to.exist;
		expect(find('[data-test-content-link-design ]')).to.exist;
		expect(find('[data-test-content-link-development]')).to.exist;
		expect(find('[data-test-content-link-consulting]')).to.exist;
		expect(find('[data-test-content-link-support]')).to.exist;
		expect(find('[data-test-content-link-management]')).to.exist;

		let contentItems = await findAll('[data-test-content-item]');
		let contentItemsHidden = await findAll('[data-test-content-item][hidden]');

		// just one item visible
		contentItems = contentItems.filter(item => contentItemsHidden.indexOf(item) < 0);
		assert(contentItems.length === 1);

		// standard content
		assert(contentItems[0].getElementsByTagName('h1')[0].innerText === 'concept title');
		assert(contentItems[0].getElementsByTagName('p')[0].innerText === 'concept text');

		click(find('[data-test-content-link-design]'));

		contentItems = await findAll('[data-test-content-item]');
		contentItemsHidden = await findAll('[data-test-content-item][hidden]');

		// just one item visible
		contentItems = contentItems.filter(item => contentItemsHidden.indexOf(item) < 0);
		assert(contentItems.length === 1);

		// new content
		assert(contentItems[0].getElementsByTagName('h1')[0].innerText === 'design title');
		assert(contentItems[0].getElementsByTagName('p')[0].innerText === 'design text');
	});
});
