import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | scroll top', function() {
	setupTest('service:scroll-top', {
		// needs: ['service:foo'],
	});

	// Replace this with your real tests.
	it('exists', function() {
		const service = this.subject();

		expect(service).to.be.ok;
	});
});
