import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
	queryParams: ['service', 'team'],

	staticContent: service(),

	service: computed(function() {
		return this._findFirstIdByComponent('services-content', 'services.0.id');
	}),

	team: computed(function() {
		return this._findFirstIdByComponent('content-folder', 'team.0.id');
	}),

	_findFirstIdByComponent(name, path) {
		const content = this.get('staticContent').readShoebox('/index');

		if (content) {
			const id = get(content.sections.find(section => section.component === name), path);

			return id;
		}

		return null;
	},
});
