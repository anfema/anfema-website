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
	},
});
