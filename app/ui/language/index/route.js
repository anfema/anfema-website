import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	staticContent: service(),

	model() {
		return this.staticContent.read('/index');
	},
});
