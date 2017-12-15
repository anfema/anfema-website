import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | project text', function() {
	setupComponentTest('project-text', {
		integration: true,
	});

	const data = {
		content: 'foo',
	};

	beforeEach(function() {
		this.set('data', data);
	});

	it('renders', function() {
		this.render(hbs`
			{{project-text data=data}}
		`);

		expect(find('.project-text').innerText).to.contain(data.content);
	});
});
