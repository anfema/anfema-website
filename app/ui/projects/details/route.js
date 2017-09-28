import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default Route.extend({
	fastboot: service(),
	intl: service(),

	model(params) {
		if (!this.get('fastboot.isFastBoot')) {
			return fetch(`/contents/${this.get('intl.locale')[0]}/projects/${params.project_id}.json`).then(response =>
				response.json()
			);
		}
	},
});
