import Route from '@ember/routing/route';
import PrefixMixin from 'anfema/mixins/prefix-mixin';
import fetch from 'fetch';
import {inject as service} from '@ember/service'

export default Route.extend(PrefixMixin, {
	fastboot: service(),
	intl: service(),

	prefix: null,

	model() {
		if (!this.get('fastboot.isFastBoot')) {
			return fetch(`/contents/${this.get('intl.locale')[0]}/index.json`).then(function (response) {
				return response.json();
			});
		}
		//TODO retrieve model in fastboot
	},

	setupController(controller, model) {
		this._super(...arguments);

		// controller.set('service', model.services[0].id);
		// controller.set('team', model.team[0].id);
	}
	,
});
