import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
	intl: inject(),
	prefix: '',

	beforeModel(params) {
		const intl = this.get('intl');

		// TODO @f.pichler is there an easier way to access translations?
		if (intl.t(`homepage.projects.${params.state.params.project.project_id}.id`) !== params.state.params.project.project_id) {
			this.transitionTo('index'); // TODO replace with 404 site
		} else {
			this.set('prefix', `homepage.projectDetails.${params.state.params.project.project_id}.`);
		}
	},

	model() {
		return {
			prefix: this.get('prefix'),
		};
	},
});
