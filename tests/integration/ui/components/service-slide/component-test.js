import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | service slide', function() {
	setupComponentTest('service-slide', {
		integration: true,
	});

	it('renders', function() {
		this.render(hbs`
			{{service-slide }}
		`);

		expect(find('.service-slide')).to.exist;
	});
});
