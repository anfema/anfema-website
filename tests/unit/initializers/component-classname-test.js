import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Application from 'ember-application';
import run from 'ember-runloop';
import { initialize } from 'anfema/initializers/component-classname';
import destroyApp from '../../helpers/destroy-app';

describe('Unit | Initializer | component classname', function () {
	let application;

	beforeEach(function () {
		run(function () {
			application = Application.create();
			application.deferReadiness();
		});
	});

	afterEach(function () {
		destroyApp(application);
	});

	// Replace this with your real tests.
	it('works', function () {
		initialize(application);

		// you would normally confirm the results of the initializer here
		expect(true).to.be.ok;
	});
});
