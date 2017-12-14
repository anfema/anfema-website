import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content lp team item', function() {
	setupComponentTest('content-lp-team-item', {
		integration: true,
	});

	it('renders', function() {
		this.render(hbs`
			{{content-lp-team-item}}
		`);

		expect(find('.content-lp-team-item')).to.exist;
	});

	it('renders an active slide if the id matches the selected id', function() {
		this.set('data', { id: 'first' });
		this.set('selected', 'first');

		this.render(hbs`{{content-lp-team-item data=data selected=selected}}`);

		const subject = find('.content-lp-team-item');

		expect(subject.classList.contains('content-lp-team-item--active'), 'Should be active').to.be
			.true;

		this.set('selected', 'second');

		expect(subject.classList.contains('content-lp-team-item--active'), 'Should not be active')
			.to.be.false;
	});
});
