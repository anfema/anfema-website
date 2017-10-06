import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | language', function() {
	setupTest('route:language', {
		needs: [
			'service:intl',
			'service:staticContent',
		],
	});

	it('exists', function() {
		const route = this.subject();

		expect(route).to.be.ok;
	});
});
