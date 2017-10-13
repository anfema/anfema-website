import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | page overlay', function() {
	setupTest('service:page-overlay', {
		// needs: ['service:foo'],
	});

	// Replace this with your real tests.
	it('exists', function() {
		const service = this.subject();

		expect(service).to.be.ok;
	});
});
