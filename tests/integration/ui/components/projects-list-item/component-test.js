import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | projects list item', function() {
	setupComponentTest('projects-list-item', {
		integration: true,
	});

	const project = { client: 'BMW', color: '#0096DA', id: 'bmw7series', title: '7 Series Presenter App' };

	beforeEach(function() {
		this.set('project', project);
	});

	it('renders', function() {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#projects-list-item}}
		// 		template content
		// 	{{/projects-list-item}}
		// `);

		this.render(hbs`{{projects-list-item project=project}}`);

		expect(find('.projects-list-item')).to.exist;

		expect(find('.projects-list-item__client')).to.exist;
		expect(
			find('.projects-list-item__client')
				.innerText.trim()
				.toLowerCase()
		).to.equal(project.client.toLowerCase());

		expect(find('.projects-list-item__title')).to.exist;
		expect(
			find('.projects-list-item__title')
				.innerText.trim()
				.toLowerCase()
		).to.equal(project.title.toLowerCase());

		expect(find('.projects-list-item__client-background')).to.exist;
		expect(
			find('.projects-list-item__client-background')
				.innerText.trim()
				.toLowerCase()
		).to.equal(project.client.toLowerCase());
	});

	it('generates a style tag rendering the background color element', function() {
		expect(document.getElementById('foo-style')).to.not.exist;

		this.render(hbs`{{projects-list-item project=project id='foo'}}`);

		const style = document.getElementById('foo-style');

		expect(style).to.exist;

		expect(style.innerText).to.contain(project.color);
	});
});
