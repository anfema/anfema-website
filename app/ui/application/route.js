import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	intl: service(),

	beforeModel() {
		// TODO: Define default language by browser header / navigator (must work in Fastboot as well)
		return this.get('intl').setLocale('de');
	},
});
