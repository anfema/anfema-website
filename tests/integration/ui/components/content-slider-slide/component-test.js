import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content slider slide', function () {
	setupComponentTest('content-slider-slide', {
		integration: true,
	});

	it('renders a slide', function () {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#content-slider-slide}}
		// 		template content
		// 	{{/content-slider-slide}}
		// `);

		this.render(hbs`{{content-slider-slide }}`);

		expect(find('.content-slider-slide')).to.exist;
	});

	it('renders an active slide if the id matches the selected id', function () {
		this.set('content', {
			id: 'foo',
		});

		this.set('selected', 'foo');

		this.render(hbs`{{content-slider-slide content=content selected=selected}}`);

		expect(find('.content-slider-slide').classList.contains('content-slider-slide--active')).to.be.true;

		this.set('selected', 'bar');

		expect(find('.content-slider-slide').classList.contains('content-slider-slide--active')).to.be.false;
	});
});
