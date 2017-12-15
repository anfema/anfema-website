import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | projects/detail', function() {
	setupTest('route:projects/detail', {
		needs: ['service:staticContent'],
	});

	it('exists', function() {
		const route = this.subject();

		expect(route).to.be.ok;
	});
});
