import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content lp text', function() {
	setupComponentTest('content-lp-text', {
		integration: true,
	});

	it('renders', function() {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#content-lp-text}}
		// 		template content
		// 	{{/content-lp-text}}
		// `);

		this.render(hbs`
			{{content-lp-text
				anchorId='1-philosophy'
				sectionLabel='01'
				title='foo'
				content='bar'
			}}
		`);

		expect(find('.content-lp-section')).to.exist;
		expect(find('.content-lp-section a')).to.exist;
		expect(
			find('.content-lp-section a')
				.innerText.toLowerCase()
				.trim()
		).to.equal('01');
		expect(find('.content-lp-section h2')).to.exist;
		expect(
			find('.content-lp-section h2')
				.innerText.toLowerCase()
				.trim()
		).to.equal('foo');
		expect(find('.content-lp-section__content')).to.exist;
		expect(
			find('.content-lp-section__content')
				.innerText.toLowerCase()
				.trim()
		).to.equal('bar');
	});
});
