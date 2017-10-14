import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | project cover', function() {
	setupComponentTest('project-cover', {
		integration: true,
	});

	it('renders', function() {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#project-cover}}
		// 		template content
		// 	{{/project-cover}}
		// `);

		this.render(hbs`{{project-cover}}`);

		expect(this.$()).to.have.length(1);
	});
});
