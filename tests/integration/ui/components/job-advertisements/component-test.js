import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | jobs overview', function() {
	setupComponentTest('job-advertisements', {
		integration: true,
	});

	const data = {
		component: 'job-advertisements',
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
		this.container.lookup('service:intl').setLocale('de');

		this.set('data', data);

		this.render(hbs`{{job-advertisements data=data}}`);
	});

	it('renders', function() {
		expect(find('.job-advertisements')).to.exist;
	});

	it('renders a list of job applications', function() {
		const overviewElement = find('.job-advertisements');

		expect(overviewElement.children).to.have.lengthOf(data.jobs.length);
	});
});
