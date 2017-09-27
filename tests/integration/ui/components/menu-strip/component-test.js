import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | menu strip', function () {
	setupComponentTest('menu-strip', {
		integration: true,
	});

	it('renders', function () {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#menu-strip}}
		// 		template content
		// 	{{/menu-strip}}
		// `);

		this.render(hbs`{{menu-strip}}`);

		expect(this.$()).to.have.length(1);
	});
});
