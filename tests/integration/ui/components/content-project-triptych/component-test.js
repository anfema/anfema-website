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
		component: 'content-project-triptych',
		defaults: {
			width: 800,
			height: 600,
		},
		images: [
			'http://via.placeholder.com/736x492',
			'http://via.placeholder.com/736x492',
			{
				url: 'http://via.placeholder.com/736x492',
				width: 508,
				height: 380,
			},
		],
		useAlternateColor: true,
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

		expect(findAll('.content-project-triptych__side-img-1')[0].getAttribute('width')).to.equal('800');
		expect(findAll('.content-project-triptych__side-img-2')[0].getAttribute('height')).to.equal('380');
	});
});
