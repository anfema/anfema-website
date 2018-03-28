import { initialize } from 'ember-responsive-image/instance-initializers/responsive-meta';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | project cover', function() {
	setupComponentTest('project-cover', {
		integration: true,
	});

	const data = {
		img: 'cover-bmw.jpg',
		title: 'BMW 7 Series Presenter App',
	};

	before(function() {
		initialize();
	});

	beforeEach(function() {
		this.set('data', data);
		this.render(hbs`{{project-cover data=data}}`);
	});

	it('renders', function() {
		expect(findAll('.project-cover__artwork')[0].getAttribute('src')).to.contain(
			'/img/responsive/cover-bmw'
		);
	});
});
