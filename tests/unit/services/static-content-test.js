import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | static content', function() {
	setupTest('service:static-content', {
		needs: ['service:intl', 'service:fastboot'],
	});

	// Replace this with your real tests.
	it('exists', function() {
		const service = this.subject();

		expect(service).to.be.ok;
	});
});
