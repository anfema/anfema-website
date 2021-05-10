import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	staticContent: service(),

	titleToken(model) {
		return model.meta.title;
	},

	model() {
		return this.staticContent.read('/about');
	},
});
