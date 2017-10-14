import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | project text', function() {
	setupComponentTest('project-text', {
		integration: true,
	});

	const data = {
		title: 'foo',
		subtitle: 'bar',
		header: 'baz',
		text: 'qux',
	};

	beforeEach(function() {
		this.set('data', data);
		this.render(hbs`
			{{project-text data=data}}
		`);
	});

	it('renders', function() {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#project-text}}
		// 		template content
		// 	{{/project-text}}
		// `);

		expect(
			find('.project-text__title')
				.innerText.toLowerCase()
				.trim()
		).to.equal('foo');
		expect(find('.project-text__subtitle').innerText.trim()).to.equal('bar');
		expect(find('.project-text__header').innerText.trim()).to.equal('baz');
		expect(find('.project-text__text').innerText.trim()).to.equal('qux');
	});
});
