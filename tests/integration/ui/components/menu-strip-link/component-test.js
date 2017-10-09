import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

const routerStub = Service.extend({
	urlFor: function () { return 'http://url'},
	isActive: function() { return false },
	currentRouteName: 'http://test',
});

describe('Integration | Component | menu strip link', function () {
	setupComponentTest('menu-strip-link', {
		integration: true,
	});

	beforeEach(function () {
		this.register('service:router', routerStub);
		this.inject.service('router', { as: 'router' });
	});

	it('renders', function () {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#menu-strip-link}}
		// 		template content
		// 	{{/menu-strip-link}}
		// `);

		this.render(hbs`{{menu-strip-link queryParams=(hash service=test)}}`);

		expect(this.$()).to.have.length(1);
	});
});
