import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content slider', function () {
	setupComponentTest('content-slider', {
		integration: true,
	});

	beforeEach(function () {
		this.set('content', [{
			id: 'concept',
			title: 'concept title',
			text: 'concept text',
			hidden: false,
		}, {
			id: 'design',
			title: 'design title',
			text: 'design text',
			hidden: true,
		}]);
	});

	it('renders', function () {
		this.render(hbs`
			{{content-slider content=content param=''}}
		`);
		expect(find('[data-test-content-item]')).to.exist;
	});
});
