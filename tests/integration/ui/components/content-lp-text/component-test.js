import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | content lp text', function () {
	setupComponentTest('content-lp-text', {
		integration: true,
	});

	it('renders', function () {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#content-lp-text}}
		// 		template content
		// 	{{/content-lp-text}}
		// `);

		this.render(hbs`{{content-lp-text}}`);

		expect(this.$()).to.have.length(1);
	});
});
