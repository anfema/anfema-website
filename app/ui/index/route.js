import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	intl: service(),

	beforeModel() {
		this.replaceWith('language', this.get('intl.locale')[0]);
	},
});
