import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | language/index', function() {
	setupTest('route:language/index', {
	});

	it('exists', function() {
		const route = this.subject();

		expect(route).to.be.ok;
	});
});
