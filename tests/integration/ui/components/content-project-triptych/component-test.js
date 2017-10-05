import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | content project triptych', function() {
	setupComponentTest('content-project-triptych', {
		integration: true,
	});

	const data = {
		title: 'title',
		text: 'text',
		coverImg: 'foo',
		leftImg: 'bar',
		rightImg: 'baz',
	};

	beforeEach(function() {
		this.set('data', data);
		this.render(hbs`
			{{content-project-triptych data=data}}
		`);
	});

	it('renders', function() {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#content-project-triptych}}
		// 		template content
		// 	{{/content-project-triptych}}
		// `);

		expect(find('.content-project-triptych__title').innerText.trim()).to.equal('title');
		expect(find('.content-project-triptych__text').innerText.trim()).to.equal('text');
		expect(findAll('.content-project-triptych__coverImg')[0].getAttribute('src')).to.equal('/img/foo.svg');
		expect(findAll('.content-project-triptych__leftImg')[0].getAttribute('src')).to.equal('/img/bar.svg');
		expect(findAll('.content-project-triptych__rightImg')[0].getAttribute('src')).to.equal('/img/baz.svg');
	});
});
