import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content folder item', function() {
	setupComponentTest('content-folder-item', {
		integration: true,
	});


	it('renders', function() {
		this.render(hbs`
			{{content-folder-item}}
		`);

		expect(find('.content-folder-item')).to.exist;
	});

	it('renders an active slide if the id matches the selected id', function() {
		this.set('content', { id: 'first' });
		this.set('selected', 'first');

		this.render(hbs`
			{{content-folder-item content=content selected=selected}}
		`);

		expect(find('.content-folder-item').classList.contains('content-folder-item--active')).to.be.true;

		this.set('selected', 'second');

		expect(find('.content-folder-item').classList.contains('content-folder-item--active')).to.be.false;
	});
});
