import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | content lp team', function() {
	setupComponentTest('content-lp-team', {
		integration: true,
	});

	const data = {
		component: 'content-lp-team',
		reasons: [
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
			{{content-lp-team
				data=data
				labelKey='title'
			}}
		`);
	});

	it('renders', function() {
		expect(find('.content-lp-team')).to.exist;
	});

	// it('renders a list of contents', function() {
	// 	const contentElement = find('.content-lp-team__content');

	// 	expect(contentElement).to.exist;
	// 	expect(contentElement.children).to.be.lengthOf(data.team.length);
	// });
});
