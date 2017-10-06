import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	intl: service(),
	staticContent: service(),

	beforeModel(transition) {
		return this.get('intl').setLocale(transition.params.language.language_id);
	},

	model() {
		return this.get('staticContent').read('/index');
	},
});
