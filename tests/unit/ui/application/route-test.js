import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | application', function() {
	setupTest('route:application', {
		needs: ['service:intl'],
	});

	it('exists', function() {
		const route = this.subject();

		expect(route).to.be.ok;
	});
});
