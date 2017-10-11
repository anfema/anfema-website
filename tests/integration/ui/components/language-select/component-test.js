import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click, find, findAll } from 'ember-native-dom-helpers';
import EmberObject from '@ember/object';
import Service from '@ember/service';

const routerStub = Service.extend({
	// eslint-disable-next-line ember/avoid-leaking-state-in-components
	_router: {
		currentURL: '/de',
	},
});

describe('Integration | Component | language select', function() {
	setupComponentTest('language-select', {
		integration: true,
	});

	beforeEach(function() {
		this.register('service:router', routerStub);
		this.inject.service('router', { as: 'router' });
		this.container.lookup('service:intl').setLocale('de');
	});

	it('renders language select for DE and EN', function() {
		this.render(hbs`
			{{language-select}}
		`);

		expect(find('.language-select')).to.exist;

		expect(findAll('.language-select-button')).to.have.lengthOf(2);
	});

	it('switches from DE to EN and vice versa', async function() {
		// 	// We no longer have to test for this as the switching element is now a link-to component
	});
});
