import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content slider', function() {
	setupComponentTest('content-slider', {
		integration: true,
	});

	const services = [
		{
			id: 'concept',
			title: 'concept title',
			text: 'concept text',
			hidden: false,
		},
		{
			id: 'id2',
			title: 'title 2',
			text: 'text 2',
			hidden: false,
		},
		{
			id: 'id3',
			title: 'title 3',
			text: 'text 3',
			hidden: false,
		},
	];

	beforeEach(function() {
		this.set('services', services);
		this.render(hbs`
			{{content-slider data=services}}
		`);
	});

	it('renders', function() {
		expect(find('.content-slider')).to.exist;
	});

	it('renders the correct active slide ', function() {
		this.set('data', services);
		this.set('selected', services[0]);

		this.render(hbs`
			{{content-slider slideComponentName="service-slide" data=services selected=selected}}
		`);

		expect(find('.content-slider__slide__active h1').textContent).to.equal(services[0].title);
	});
});
