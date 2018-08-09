import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	staticContent: service(),
	intl: service(),

	titleToken() {
		return this.intl.t('index.title');
	},

	model() {
		return this.get('staticContent').read('/index');
	},
});
