import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import startApp from 'anfema/tests/helpers/start-app';
import destroyApp from 'anfema/tests/helpers/destroy-app';
import { find } from 'ember-native-dom-helpers';

describe('Acceptance | ui/projects/index', function() {
	let application;
	const defaultLocale = 'de';
	const landingPage = `/${defaultLocale}`;

	beforeEach(async function() {
		application = startApp();
		await visit(`${landingPage}/projects`);
	});

	afterEach(function() {
		destroyApp(application);
	});

	it('can visit /projects', async function() {
		expect(currentURL()).to.equal(`${landingPage}/projects`);
	});

	it('renders a list of projects', function() {
		expect(find('.projects-list')).to.exist;
	});
});
