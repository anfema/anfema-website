import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | services content', function () {
	setupComponentTest('services-content', {
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
		}
	];


	it('renders', function () {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#services-content}}
		// 		template content
		// 	{{/services-content}}
		// `);
		this.set('services', services);
		this.render(hbs`{{services-content data=services}}`);
		expect(find('.service-content')).to.exist;
	});
});
