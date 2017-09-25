import Route from '@ember/routing/route';
import PrefixMixin from 'anfema/mixins/prefix-mixin';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default Route.extend(PrefixMixin, {
	fastboot: service(),
	intl: service(),

	prefix: null,

	model() {
		if (!this.get('fastboot.isFastBoot')) {
			return fetch(`/contents/${this.get('intl.locale')[0]}/index.json`).then(response =>
				response.json()
			);
		}
		//TODO retrieve model in fastboot
	},

	setupController(controller, model) {
		this._super(...arguments);

		if (!this.get('fastboot.isFastBoot')) {
			const services = model.sections.find(section => section.component === 'content-slider');
			const team = model.sections.find(section => section.component === 'content-folder');

			controller.set('service', services.services[0].id);
			controller.set('team', team.team[0].id);
		}
	},
});
