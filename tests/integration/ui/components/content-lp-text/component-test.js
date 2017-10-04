import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content lp text', function() {
	setupComponentTest('content-lp-text', {
		integration: true,
	});

	const data = {
		anchorId: '1-philosophy',
		component: 'content-lp-text',
		content: 'bar',
		sectionLabel: '01',
		title: 'foo',
	};

	it('renders', function() {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#content-lp-text}}
		// 		template content
		// 	{{/content-lp-text}}
		// `);

		this.set('data', data);

		this.render(hbs`{{content-lp-text data=data}}`);

		expect(find('.content-lp-text')).to.exist;
		expect(find('.content-lp-text a')).to.exist;
		expect(
			find('.content-lp-text a')
				.innerText.toLowerCase()
				.trim()
		).to.equal('01');
		expect(find('.content-lp-text h2')).to.exist;
		expect(
			find('.content-lp-text h2')
				.innerText.toLowerCase()
				.trim()
		).to.equal('foo');
		expect(find('.content-lp-text__content')).to.exist;
		expect(
			find('.content-lp-text__content')
				.innerText.toLowerCase()
				.trim()
		).to.equal('bar');
	});
});
