import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	intl: service(),
	staticContent: service(),

	model({ language_id }) {
		if (this.get('intl.locales').indexOf(language_id) < 0) {
			this.transitionTo('index');
		}

		this.intl.setLocale(language_id);

		return null;
	},
});
