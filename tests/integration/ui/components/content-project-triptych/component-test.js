import { initialize } from 'ember-responsive-image/instance-initializers/responsive-meta';
import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

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
			'test.png',
			'test2.png',
			{
				url: 'test3.png',
				width: 508,
				height: 380,
			},
		],
		useAlternateColor: true,
	};

	before(function() {
		initialize();
	});

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
		expect(findAll('.content-project-triptych__side-img-1')[0].getAttribute('src')).to.contain(
			'/img/projects/test'
		);
	});
});
