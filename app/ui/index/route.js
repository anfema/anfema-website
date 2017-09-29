import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	intl: service(),

	beforeModel() {
		// redirect with 'de' as default language
		this.replaceWith('language', this.get('intl.locale'));
	},
});
