import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | project detail', function() {
	setupComponentTest('project-detail', {
		integration: true,
	});

	it('renders', function() {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#project-detail}}
		// 		template content
		// 	{{/project-detail}}
		// `);

		this.render(hbs`{{project-detail}}`);

		expect(this.$()).to.have.length(1);
	});
});
