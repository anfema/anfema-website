import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | intl', function () {
	setupTest('service:intl', {
		// needs: ['service:foo'],
	});

	// Replace this with your real tests.
	it('exists', function () {
		const service = this.subject();

		expect(service).to.be.ok;
	});
});
