import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';


const routerStub = Service.extend({
	urlFor: function () { return 'http://url' },
	isActive: function () { return false },
	currentRouteName: 'http://test',
});

const services = [
	{
		id: 'concept',
		title: 'concept title',
		text: 'concept text',
		logoStep: 0
	},
	{
		id: 'id2',
		title: 'title 2',
		text: 'text 2',
		logoStep: 1
	},
	{
		id: 'id3',
		title: 'title 3',
		text: 'text 3',
		logoStep: 2
	},
];

describe('Integration | Component | menu strip', function() {
	setupComponentTest('menu-strip', {
		integration: true,
	});

	beforeEach(function () {
		this.register('service:router', routerStub);
		this.inject.service('router', { as: 'router' });
	});

	it('renders', function() {
		this.set('services', services);
		this.render(hbs`{{menu-strip items=services}}`);

		expect(this.$()).to.have.length(1);
	});
});
