import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import startApp from 'anfema/tests/helpers/start-app';
import destroyApp from 'anfema/tests/helpers/destroy-app';

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

	it('can visit /imprint from footer', async function () {
		await click('[data-test-footer-imprint]');
		expect(find('[data-test-imprint-page]')).to.exist;
	});
});
