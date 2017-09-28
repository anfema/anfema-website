import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	staticContent: service(),

	model(params) {
		return this.get('staticContent').read(`/projects/${params.project_id}`);
	},
});
