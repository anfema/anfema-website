import { initialize } from 'ember-responsive-image/instance-initializers/responsive-meta';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | content project gallery', function() {
	setupComponentTest('content-project-gallery', {
		integration: true,
	});

	before(function() {
		initialize();
	});

	const data = {
		defaults: {
			width: 584,
			height: 438,
		},
		images: ['test.png', 'test2.png', 'test3.png', 'test4.png'],
	};

	beforeEach(function() {
		this.set('data', data);
		this.render(hbs`
			{{content-project-gallery data=data}}
		`);
	});

	it('renders', function() {
		expect(findAll('.content-project-gallery__image--landscape-default')).to.have.lengthOf(
			data.images.length
		);
		expect(
			findAll('.content-project-gallery__image--landscape-default')[0].getAttribute('src')
		).to.contain('/img/responsive/test');
	});
});
