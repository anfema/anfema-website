import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import startApp from 'anfema/tests/helpers/start-app';
import destroyApp from 'anfema/tests/helpers/destroy-app';
import { click, find, findAll } from 'ember-native-dom-helpers';

describe('Acceptance | ui/index', function() {
	let application;

	beforeEach(function() {
		application = startApp();
	});

	afterEach(function() {
		destroyApp(application);
	});

	it('can visit /index', async function() {
		await visit('/');

		expect(currentURL()).to.equal('/');
	});

	it('can visit /imprint from footer', async function() {
		await visit('/');

		await click('[data-test-footer-imprint]');

		expect(currentURL()).to.equal('/imprint');
	});

	it('can navigate between slides', async function() {
		await visit('/');

		expect(find('.content-slider')).to.exist;

		// just one slide active
		expect(findAll('.content-slider-slide--active')).to.have.lengthOf(1);

		// no query param yet
		expect(currentURL()).to.equal('/');

		// show query param
		await click('.content-slider__navigation a:nth-of-type(2)');

		expect(find('.content-slider__navigation a:nth-of-type(2)').search.match(/service=(\w+)/)).to.include(
			currentURL().match(/service=(\w+)/)[1]
		);
	});

	it('can navigate between folder items', async function() {
		await visit('/');

		expect(find('.content-folder')).to.exist;

		// just one slide active
		expect(findAll('.content-folder-item--active')).to.have.lengthOf(1);

		// no query param yet
		expect(currentURL()).to.equal('/');

		// show query param
		await click('.content-folder__navigation a:nth-of-type(2)');
		expect(find('.content-folder__navigation a:nth-of-type(2)').search.match(/team=(\w+)/)).to.include(
			currentURL().match(/team=(\w+)/)[1]
		);
	});

	it('can navigate between folder items', async function () {
		expect(find('.content-folder')).to.exist;

		// just one slide active
		expect(findAll('.content-folder-item--active')).to.have.lengthOf(1);

		// no query param yet
		expect(currentURL()).to.equal('/');

		// show query param
		await click('.content-folder__navigation a:nth-of-type(2)');
		expect(find('.content-folder__navigation a:nth-of-type(2)').search.match(/team=(\w+)/))
			.to.include(currentURL().match(/team=(\w+)/)[1]);
	});
});
