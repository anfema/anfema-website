import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | job application', function() {
	setupComponentTest('job-advertisements-item', {
		integration: true,
	});

	const job = [
		{
			title: 'Student Intern Android Development (f/m/*)',
			description: 'Starting Mid 2018',
			details_link: '#',
			team: 'Android',
			apply_link: 'jobs+android@anfe.ma',
		},
	];

	beforeEach(function() {
		this.container.lookup('service:intl').setLocale('de');
	});

	it('renders', function() {
		this.set('job', job);
		this.render(hbs`
			{{job-advertisements-item
				title=job.title
				description=job.description
				details_link=job.details_link
				team=job.team}}
		`);
		expect(find('.job-advertisements-item__title')).to.exist;
		expect(find('.job-advertisements-item__description')).to.exist;
		expect(find('.job-advertisements-item__details_link')).to.exist;
		expect(find('.job-advertisements-item__team')).to.exist;
		expect(find('.job-advertisements-item__apply_link')).to.exist;
		expect(find('.job-advertisements-item')).to.exist;
	});
});
