import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content slider slide', function() {
	setupComponentTest('content-slider-slide', {
		integration: true,
	});

	it('renders', function() {
		this.render(hbs`
			{{content-slider-slide }}
		`);

		expect(find('.content-slider-slide')).to.exist;
	});

	it('renders an active slide if the id matches the selected id', function() {
		this.set('content', { id: 'first' });
		this.set('selected', 'first');

		this.render(hbs`
			{{content-slider-slide content=content selected=selected}}
		`);

		expect(find('.content-slider-slide').classList.contains('content-slider-slide--active')).to.be.true;

		this.set('selected', 'second');

		expect(find('.content-slider-slide').classList.contains('content-slider-slide--active')).to.be.false;
	});
});
