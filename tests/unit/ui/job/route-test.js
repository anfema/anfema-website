import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | job', function () {
	setupTest('route:job', {
		// needs: [
		// 	'controller:foo',
		// ],
	});

	it('exists', function () {
		const route = this.subject();

		expect(route).to.be.ok;
	});
});
