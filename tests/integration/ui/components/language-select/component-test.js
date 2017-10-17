import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click, find, findAll } from 'ember-native-dom-helpers';
import { generateLangUrl } from 'anfema/ui/components/language-select/component';

const routerStub = {
	_router: {
		currentURL: '/de',
	},
};

describe('Integration | Component | language select', function() {
	setupComponentTest('language-select', {
		integration: true,
	});

	beforeEach(function() {
		this.set('router', routerStub);
		this.container.lookup('service:intl').setLocale('de');
	});

	it('generates language url correctly', function() {
		expect(generateLangUrl(routerStub, 'en')).to.equal('/en');
	});

	it('renders language select for DE and EN', function() {
		this.render(hbs`
			{{language-select router=router}}
		`);

		expect(find('.language-select')).to.exist;

		expect(findAll('.language-select-button')).to.have.lengthOf(2);
	});
});
