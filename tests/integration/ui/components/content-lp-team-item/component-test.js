import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

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
		this.set('content', { id: 'first' });
		this.set('selected', 'first');

		this.render(hbs`
			{{content-lp-team-item content=content selected=selected}}
		`);

		expect(find('.content-lp-team-item').classList.contains('content-lp-team-item--active')).to.be.true;

		this.set('selected', 'second');

		expect(find('.content-lp-team-item').classList.contains('content-lp-team-item--active')).to.be.false;
	});
});
