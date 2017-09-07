import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
	intl: inject(),
	prefix: '',
	model() {
		return {
			prefix: 'homepage.jobs.',
		};
	},
});
