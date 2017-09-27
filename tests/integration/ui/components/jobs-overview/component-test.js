import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | jobs overview', function() {
	setupComponentTest('jobs-overview', {
		integration: true,
	});

	const data = {
		component: 'jobs-overview',
		jobs: [
			{
				description: 'Ab 2018',
				detailsLink: '#',
				team: 'android',
				title: 'Praktikum Android Development (f/m/*)',
			},
		],
	};

	beforeEach(function() {
		this.set('data', data);

		this.render(hbs`{{jobs-overview data=data}}`);
	});

	it('renders', function() {
		expect(find('.jobs-overview')).to.exist;
	});

	it('renders a list of job applications', function() {
		const overviewElement = find('.jobs-overview');

		expect(overviewElement.children).to.have.lengthOf(data.jobs.length);
	});
});
