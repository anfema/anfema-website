import { initialize } from 'ember-responsive-image/instance-initializers/responsive-meta';
import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | project cover', function() {
	setupComponentTest('project-cover', {
		integration: true,
	});

	const data = {
		img: 'test.png',
		title: 'BMW 7 Series Presenter App',
	};

	before(function() {
		initialize();
	});

	it('renders', function() {
		this.set('data', data);
		this.render(hbs`{{project-cover data=data}}`);

		expect(findAll('.project-cover__artwork')[0].getAttribute('src')).to.contain(
			'/img/responsive/test'
		);
	});
});
