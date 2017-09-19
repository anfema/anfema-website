import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content folder', function() {
	setupComponentTest('content-folder', {
		integration: true,
	});

	const content = [
		{
			id: 'team',
			title: 'team title',
			text: 'team text',
			hidden: false,
		},
	];

	beforeEach(function() {
		this.set('content', content);
		this.render(hbs`
			{{content-folder
				contents=content
				labelKey='title'
			}}
		`);
	});

	it('renders', function() {
		expect(find('.content-folder')).to.exist;
	});

	it('renders a navigation bar', function() {
		expect(find('.content-folder__navigation')).to.exist;

		const link = find('.content-folder__navigation-link');

		expect(link).to.exist;
		expect(link.innerText).to.equal('team title');
	});

	it('renders a list of contents', function() {
		const contentElement = find('.content-folder__content');

		expect(contentElement).to.exist;
		expect(contentElement.children).to.be.lengthOf(content.length);
	});
});
