import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | anfema logo', function () {
	setupComponentTest('anfema-logo', {
		integration: true,
	});

	it('renders', function () {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#anfema-logo}}
		// 		template content
		// 	{{/anfema-logo}}
		// `);

		this.render(hbs`{{anfema-logo}}`);

		expect(this.$()).to.have.length(1);
	});
});
