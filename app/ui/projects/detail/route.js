import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	staticContent: service(),
	win: service(),

	sections: readOnly('model.sections'),

	jumpSections: computed('sections.@each', function() {
		return this.sections.reduce((acc, section) => {
			if (section.anchorId) {
				acc.push(section);
			}

			return acc;
		}, []);
	}),

	titleToken(model) {
		return `${model.meta.client}: ${model.meta.title}`;
	},

	model(params) {
		return this.staticContent.read(`/projects/${params.project_id}`);
	},
});
