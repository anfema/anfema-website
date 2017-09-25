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
			const contentText1 = model.sections.find(section => section.id === '1-philosophy');
			const contentText2 = model.sections.find(section => section.id === '2-philosophy');
			const contentText3 = model.sections.find(section => section.id === '3-philosophy');

			controller.set('service', services.services[0].id);
			controller.set('team', team.team[0].id);
			controller.set('contentText1', contentText1);
			controller.set('contentText2', contentText2);
			controller.set('contentText3', contentText3);
			controller.set('service_arr', services.services);
			controller.set('team_arr', team.team);
		}
	},
});
