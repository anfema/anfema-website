import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	fastboot: service(),
	intl: service(),

	model() {
		if (!this.get('fastboot.isFastBoot')) {
			return fetch(`/contents/${this.get('intl.locale')[0]}/projects/index.json`).then(response =>
				response.json()
			);
		}
		//TODO retrieve model in fastboot
	},
});
