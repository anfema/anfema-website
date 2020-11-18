import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	staticContent: service(),
	win: service(),

	model() {
		return this.staticContent.read('/projects/index');
	},
	afterModel() {
		this.win.scrollToTop();
	},
});
