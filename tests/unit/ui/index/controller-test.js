import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Controller | index', function () {
	setupTest('controller:index', {
		// needs: ['controller:foo'],
	});

	// Replace this with your real tests.
	it('exists', function () {
		const controller = this.subject();

		// TODO @f.pichler
		//	eslint-disable-next-line no-unused-expressions
		expect(controller).to.be.ok;
	});
});