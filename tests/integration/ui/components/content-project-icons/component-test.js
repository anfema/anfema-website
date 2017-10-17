import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | content project icons', function() {
	setupComponentTest('content-project-icons', {
		integration: true,
	});

	const data = {
		title: 'foo',
		text: 'bar',
		icons: ['icon-foo', 'icon-bar', 'icon-baz', 'icon-qux'],
	};

	beforeEach(function() {
		this.set('data', data);
		this.render(hbs`{{content-project-icons data=data}}`);
	});

	it('renders', function() {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#content-project-icons}}
		// 		template content
		// 	{{/content-project-icons}}
		// `);

		expect(
			find('.content-project-icons__title')
				.innerText.toLowerCase()
				.trim()
		).to.equal('foo');
		expect(
			find('.content-project-icons__text')
				.innerText.toLowerCase()
				.trim()
		).to.equal('bar');
		expect(findAll('.content-project-icons__icon')).to.have.lengthOf(4);
		expect(findAll('.content-project-icons__icon')[0].getAttribute('src')).to.equal('icon-foo');
	});
});
