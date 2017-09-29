import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Controller | language/index', function() {
	setupTest('controller:language/index', {
		// needs: ['controller:foo'],
	});

	// Replace this with your real tests.
	it('exists', function() {
		const controller = this.subject();

		expect(controller).to.be.ok;
	});
});
