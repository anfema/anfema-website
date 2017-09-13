import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | info footer', function () {
	setupComponentTest('info-footer', {
		integration: true,
	});

	it('renders', function () {
		this.render(hbs`{{info-footer}}`);

		expect(findAll('[data-test-footer-header]').length).to.equal(2);
		expect(findAll('[data-test-footer-phone-fax]').length).to.equal(2);
		expect(findAll('[data-test-footer-street]').length).to.equal(2);
		expect(findAll('[data-test-footer-city]').length).to.equal(2);
		expect(findAll('[data-test-footer-country]').length).to.equal(2);
		expect(find('[data-test-footer-imprint]')).to.exist;
		expect(find('[data-test-footer-logo]')).to.exist;
		expect(find('[data-test-footer-anfema]')).to.exist;
		expect(find('[data-test-footer-mail]')).to.exist;
		expect(find('[data-test-footer-language-select]')).to.exist;
	});
});
