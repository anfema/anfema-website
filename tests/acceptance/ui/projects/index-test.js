import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import startApp from 'anfema/tests/helpers/start-app';
import destroyApp from 'anfema/tests/helpers/destroy-app';
import { find } from 'ember-native-dom-helpers';

describe('Acceptance | ui/projects/index', function () {
	let application;

	beforeEach(async function () {
		application = startApp();
		await visit('/projects');
	});

	afterEach(function () {
		destroyApp(application);
	});

	it('can visit /projects', async function () {
		expect(currentURL()).to.equal('/projects');
	});

	// TODO @f.pichler redirection tests not possible in integration tests?
	it('can visit /projects subroute', async function () {
		await click('[data-test-project-item]');
		expect(find('[data-test-project-detail-page]')).to.exist;
	});

	it('renders a list of projects', function () {
		expect(find('[data-test-projects-list]')).to.exist;
	});
});
