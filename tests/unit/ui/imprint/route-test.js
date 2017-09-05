import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | imprint', function () {
	setupTest('route:imprint', {
		// needs: [
		// 	'controller:foo',
		// ],
	});

	it('exists', function () {
		const route = this.subject();

		expect(route).to.be.ok;
	});
});
