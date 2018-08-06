import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	intl: service(),

	titleToken() {
		return this.intl.t('projects.title');
	},
});
