import Route from '@ember/routing/route';
import PrefixMixin from 'anfema/mixins/prefix-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(PrefixMixin, {
	staticContent: service(),

	model() {
		return this.get('staticContent').read('/index');
	},

	setupController(controller, model) {
		this._super(...arguments);

		const services = model.sections.find(section => section.component === 'content-slider');
		const team = model.sections.find(section => section.component === 'content-folder');

		controller.set('service', services.services[0].id); // TODO @f.pichler this does not work anymore
		controller.set('team', team.team[0].id); // TODO @f.pichler this does not work anymore
	},
});
