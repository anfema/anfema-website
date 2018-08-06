import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	staticContent: service(),
	win: service(),

	titleToken(model) {
		return model.title;
	},

	model() {
		return this.get('staticContent').read('/projects/index');
	},

	afterModel() {
		this.get('win').scrollToTop();
	},
});
