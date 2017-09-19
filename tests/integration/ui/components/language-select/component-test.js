import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click, find, findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | language select', function() {
	setupComponentTest('language-select', {
		integration: true,
	});

	it('renders language select for DE and EN', function() {
		this.render(hbs`
			{{language-select}}
		`);

		expect(find('.language-select')).to.exist;

		expect(findAll('.language-select-button')).to.have.lengthOf(2);
	});

	it('switches from DE to EN and vice versa', async function() {
		this.render(hbs`
			{{language-select}}
		`);

		await click('[data-test-locale="en-us"]');

		expect(find('[data-test-locale=de]').className).to.not.include(
			'language-select-button--active'
		);
		expect(find('[data-test-locale=en-us]').className).to.include(
			'language-select-button--active'
		);

		await click('[data-test-locale="de"]');

		expect(find('[data-test-locale=de]').className).to.include(
			'language-select-button--active'
		);
		expect(find('[data-test-locale=en-us]').className).to.not.include(
			'language-select-button--active'
		);
	});
});
