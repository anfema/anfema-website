import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
	intl: inject(),
	prefix: '',

	beforeModel(params) {
		const intl = this.get('intl');

		// TODO @f.pichler is there an easier way to access translations?
		if (intl.t(`homepage.jobs.${params.state.params.job.job_id}.id`) !== params.state.params.job.job_id) {
			this.transitionTo('index'); // TODO replace with 404 site
		} else {
			this.set('prefix', `homepage.jobDetails.${params.state.params.job.job_id}.`);
		}
	},

	model() {
		return {
			prefix: this.get('prefix'),
		};
	},
});
