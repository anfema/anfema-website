import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | projects/index', function() {
	setupTest('route:projects/index', {
		needs: ['service:staticContent', 'service:win'],
	});

	it('exists', function() {
		const route = this.subject();

		expect(route).to.be.ok;
	});
});
