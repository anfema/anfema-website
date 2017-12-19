import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	staticContent: service(),
	scrollTop: service(),

	model() {
		return this.get('staticContent').read('/projects/index');
	},
	afterModel() {
		this.get('scrollTop').scrollToTop();
	},
});
