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

		expect(findAll('.p-street-address')).to.have.lengthOf(2);
		expect(findAll('.p-locality')).to.have.lengthOf(2);
		expect(findAll('.p-country-name')).to.have.lengthOf(2);
		expect(findAll('[data-test-footer-header]')).to.have.lengthOf(2);
		expect(findAll('[data-test-footer-fax]')).to.exist;
		expect(findAll('[data-test-footer-language-select]')).to.exist;
		expect(findAll('[data-test-footer-anfema]')).to.exist;
		expect(findAll('[data-test-footer-imprint]')).to.exist;
		expect(find('.u-logo')).to.exist;
		expect(find('.u-email')).to.exist;
		expect(findAll('.p-tel')).to.exist;
	});
});
