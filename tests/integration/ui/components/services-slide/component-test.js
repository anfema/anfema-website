import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | services slide', function() {
	setupComponentTest('services-slide', {
		integration: true,
	});

	it('renders', function() {
		this.render(hbs`
			{{services-slide}}
		`);

		expect(find('.services-slide')).to.exist;
	});
});
