import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | job application', function() {
	setupComponentTest('job-application', {
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

	it('renders', function() {
		this.set('job', job);
		this.render(hbs`
			{{job-application
				title=job.title
				description=job.description
				details_link=job.details_link
				team=job.team}}
		`);
		expect(find('.job-application__title')).to.exist;
		expect(find('.job-application__description')).to.exist;
		expect(find('.job-application__details_link')).to.exist;
		expect(find('.job-application__team')).to.exist;
		expect(find('.job-application__apply_link')).to.exist;
		expect(find('.job-application')).to.exist;
	});
});
