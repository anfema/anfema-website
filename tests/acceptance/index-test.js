import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import startApp from 'anfema/tests/helpers/start-app';
import destroyApp from 'anfema/tests/helpers/destroy-app';
import { click, find, findAll } from 'ember-native-dom-helpers';

describe('Acceptance | ui/index', function () {
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

	it('can visit /imprint from footer', async function () {
		await click('[data-test-footer-imprint]');
		expect(currentURL()).to.equal('/imprint');
	});

	it('can navigate between slides', async function () {
		expect(find('.content-slider')).to.exist;

		// just one slide active
		expect(findAll('.content-slider-slide--active').length).to.equal(1);

		// no query param yet
		expect(currentURL()).to.equal('/');

		// show query param
		await click('.content-slider__navigation a:nth-of-type(2)');
		expect(find('.content-slider__navigation a:nth-of-type(2)').search.match(/service=(\w+)/))
			.to.include(currentURL().match(/service=(\w+)/)[1]);
	});
});
