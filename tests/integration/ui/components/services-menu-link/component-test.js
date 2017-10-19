import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import { find } from 'ember-native-dom-helpers';

const routerStub = Service.extend({
	urlFor: function() {
		return 'http://url';
	},
	isActive: function() {
		return false;
	},
	currentRouteName: 'http://test',
});

describe('Integration | Component | services menu link', function() {
	setupComponentTest('services-menu-link', {
		integration: true,
	});

	beforeEach(function() {
		this.register('service:router', routerStub);
		this.inject.service('router', { as: 'router' });
	});

	it('renders', function() {
		this.render(hbs`{{services-menu-link queryParams=(hash service=test)}}`);

		expect(find('.services-menu-link')).to.exist;
	});
});
