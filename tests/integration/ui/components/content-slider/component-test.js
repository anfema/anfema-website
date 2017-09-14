import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content slider', function () {
	setupComponentTest('content-slider', {
		integration: true,
	});

	const content = [{
		id: 'concept',
		title: 'concept title',
		text: 'concept text',
		hidden: false,
	}];

	beforeEach(function () {
		this.set('content', content);
		this.render(hbs`
			{{content-slider
				contents=content
				labelKey='title'
			}}
		`);
	});

	it('renders', function () {
		expect(find('.content-slider')).to.exist;
	});

	it('renders a navigation bar', function () {
		expect(find('.content-slider__navigation')).to.exist;

		const link = find('.content-slider__navigation-link');

		expect(link).to.exist;
		expect(link.innerText).to.equal('concept title');

		// TODO: Check query-param in an acceptance test if necessary
	});

	it('renders a list of contents', function () {
		const contentElement = find('.content-slider__content');

		expect(contentElement).to.exist;
		expect(contentElement.children).to.be.lengthOf(content.length);
	});
});
