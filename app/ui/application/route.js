import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
	i18n: inject(),

	afterModel() {
		this.set('i18n.locale', 'de');
	},
});
