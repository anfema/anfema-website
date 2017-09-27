import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | services content', function () {
	setupComponentTest('services-content', {
		integration: true,
	});

	it('renders', function () {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#services-content}}
		// 		template content
		// 	{{/services-content}}
		// `);

		this.render(hbs`{{services-content}}`);

		expect(this.$()).to.have.length(1);
	});
});
