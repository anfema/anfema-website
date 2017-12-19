import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	staticContent: service(),

	model() {
		return this.get('staticContent').read('/projects/index');
	},
	afterModel() {
		if (window && window.scrollTo) {
			window.scrollTo(0, 0);
		}
	},
});
