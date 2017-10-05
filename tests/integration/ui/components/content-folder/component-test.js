import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content folder', function() {
	setupComponentTest('content-folder', {
		integration: true,
	});

	const data = {
		component: 'content-folder',
		team: [
			{
				id: 'team',
				title: 'team title',
				text: 'team text',
				hidden: false,
			},
		],
	};

	beforeEach(function() {
		this.set('data', data);
		this.render(hbs`
			{{content-folder
				data=data
				labelKey='title'
			}}
		`);
	});

	it('renders', function() {
		expect(find('.content-folder')).to.exist;
	});

	// it('renders a list of contents', function() {
	// 	const contentElement = find('.content-folder__content');

	// 	expect(contentElement).to.exist;
	// 	expect(contentElement.children).to.be.lengthOf(data.team.length);
	// });
});
