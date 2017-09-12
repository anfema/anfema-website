import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | project item', function () {
	setupComponentTest('project-item', {
		integration: true,
	});

	it('renders', function () {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#project-item}}
		// 		template content
		// 	{{/project-item}}
		// `);

		this.render(hbs`{{project-item 'projects.details' 'bmw7series'}}`);

		// TODO: add tests for all project components
		// TODO: check for elements to be visible

		expect(this.$()).to.have.length(1);
	});
});
