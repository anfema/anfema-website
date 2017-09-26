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

	it('renders an active slide if the id matches the selected id', function() {
		this.set('content', { id: 'first' });
		this.set('selected', 'first');

		this.render(hbs`
			{{service-slide content=content selected=selected}}
		`);

		expect(find('.service-slide').classList.contains('service-slide--active')).to
			.be.true;

		this.set('selected', 'second');

		expect(find('.service-slide').classList.contains('service-slide--active')).to
			.be.false;
	});
});
