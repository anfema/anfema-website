import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import { find } from 'ember-native-dom-helpers';

const routerStub = Service.extend({
	urlFor() {
		return 'http://url';
	},
	isActive() {
		return false;
	},
	currentRouteName: 'http://test',
});

const services = [
	{
		id: 'concept',
		title: 'concept title',
		text: 'concept text',
		logoStep: 0,
	},
	{
		id: 'id2',
		title: 'title 2',
		text: 'text 2',
		logoStep: 1,
	},
	{
		id: 'id3',
		title: 'title 3',
		text: 'text 3',
		logoStep: 2,
	},
];

describe('Integration | Component | services menu', function() {
	setupComponentTest('services-menu', {
		integration: true,
	});

	beforeEach(function() {
		this.register('service:router', routerStub);
		this.inject.service('router', { as: 'router' });
	});

	it('renders', function() {
		this.set('services', services);
		this.render(hbs`{{services-menu items=services}}`);

		expect(find('.services-menu')).to.exist;
	});
});
