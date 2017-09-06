import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | jobs', function () {
	setupTest('route:jobs', {
		// needs: [
		// 	'controller:foo',
		// ],
	});

	it('exists', function () {
		const route = this.subject();

		// TODO @f.pichler
		//	eslint-disable-next-line no-unused-expressions
		expect(route).to.be.ok;
	});
});
