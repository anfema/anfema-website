import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | page footer', function () {
	setupComponentTest('page-footer', {
		integration: true,
	});

	it('renders', function () {
		this.render(hbs`{{page-footer}}`);

		expect(findAll('.p-street-address')).to.have.lengthOf(2);
		expect(findAll('.p-locality')).to.have.lengthOf(2);
		expect(findAll('.p-country-name')).to.have.lengthOf(2);
		expect(findAll('.page-footer__office-title')).to.have.lengthOf(2);
		expect(findAll('.language-select')).to.exist;
		expect(findAll('.copyright')).to.exist;
		expect(findAll('.imprint')).to.exist;
		expect(find('.u-logo')).to.exist;
		expect(find('.u-email')).to.exist;
		expect(findAll('.p-tel')).to.have.lengthOf(2);
	});
});
