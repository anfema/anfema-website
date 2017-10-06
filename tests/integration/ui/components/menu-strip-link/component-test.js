import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | menu strip link', function () {
	setupComponentTest('menu-strip-link', {
		integration: true,
	});

	it('renders', function () {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#menu-strip-link}}
		// 		template content
		// 	{{/menu-strip-link}}
		// `);

		this.render(hbs`{{menu-strip-link}}`);

		expect(this.$()).to.have.length(1);
	});
});
