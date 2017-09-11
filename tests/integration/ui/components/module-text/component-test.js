import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | module text', function () {
	setupComponentTest('module-text', {
		integration: true,
	});

	it('renders', function () {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#module-text}}
		// 		template content
		// 	{{/module-text}}
		// `);

		this.render(hbs`{{module-text}}`);

		expect(this.$()).to.have.length(1);
	});
});
