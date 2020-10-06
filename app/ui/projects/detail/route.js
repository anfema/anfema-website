import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default Route.extend({
	staticContent: service(),
	win: service(),

	sections: readOnly('model.sections'),

	jumpSections: computed('sections.@each', function() {
		return this.get('sections').reduce((acc, section) => {
			if (section.anchorId) {
				acc.push(section);
			}

			return acc;
		}, []);
	}),

	titleToken(model) {
		return model.meta.title;
	},

	model(params) {
		return this.get('staticContent').read(`/projects/${params.project_id}`);
	},
});
