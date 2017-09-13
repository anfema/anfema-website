import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'anfema/tests/helpers/start-app';
import destroyApp from 'anfema/tests/helpers/destroy-app';

describe('Acceptance | ui/projects/index', function () {
	let application;

	beforeEach(function () {
		application = startApp();
	});

	afterEach(function () {
		destroyApp(application);
	});

	it('can visit /projects', async function () {
		await visit('/projects');

		expect(currentURL()).to.equal('/projects');
	});

	it('renders a list of projects', async function () {
		await visit('/projects');

		expect(find('[data-test-projects-list]')).to.exist;
		expect(findAll('[data-test-project]').length).to.equal(8);
	});
});
