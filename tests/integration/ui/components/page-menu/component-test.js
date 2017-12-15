import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | page menu', function() {
	setupComponentTest('page-menu', {
		integration: true,
	});

	beforeEach(function() {
		this.container.lookup('service:intl').setLocale('de');
	});

	it('renders a logo', function() {
		this.render(hbs`{{page-menu}}`);

		expect(find('.page-menu__logo')).to.exist;
	});

	it('renders a navigation', function() {
		this.render(hbs`{{#page-menu}}<ul></ul>{{/page-menu}}`);

		expect(find('.page-menu__nav ul')).to.exist;
	});

	// TODO: Test scroll behavior? Probably better to do in a visual test
});
