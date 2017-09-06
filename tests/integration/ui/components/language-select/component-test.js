import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | language select', function () {
	setupComponentTest('language-select', {
		integration: true,
	});

	it('renders', function () {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#language-select}}
		// 		template content
		// 	{{/language-select}}
		// `);

		this.render(hbs`{{language-select}}`);

		expect(this.$()).to.have.length(1);
	});
});
