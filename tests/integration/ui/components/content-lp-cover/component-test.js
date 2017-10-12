import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content lp cover', function() {
	setupComponentTest('content-lp-cover', {
		integration: true,
	});

	const data = {
		headline: 'foo',
		subtitle: '<p>bar</p>',
		component: 'content-lp-cover',
	};

	beforeEach(function() {
		this.container.lookup('service:intl').setLocale('de');
	});

	it('renders', function() {
		this.set('data', data);

		this.render(hbs`{{content-lp-cover data=data}}`);

		expect(find('.content-lp-cover')).to.exist;
		expect(find('.content-lp-cover h1')).to.exist;
		expect(
			find('.content-lp-cover h1')
				.innerText.toLowerCase()
				.trim()
		).to.equal('foo');
		expect(find('.content-lp-cover p')).to.exist;
		expect(
			find('.content-lp-cover p')
				.innerText.toLowerCase()
				.trim()
		).to.equal('bar');
	});
});
