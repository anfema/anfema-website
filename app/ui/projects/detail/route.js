import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { readOnly } from '@ember/object/computed';

function findByComponentNameAndPath(model, name, path) {
	if (model && model.sections) {
		return get(model.sections.find(s => s.component === name), path);
	}

	return null;
}

export default Route.extend({
	queryParams: 'topFeatures',

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

	topFeatures: computed(function() {
		return findByComponentNameAndPath(
			this.get('staticContent').readShoebox('/index'),
			'top-features',
			'topFeatures.0.id'
		);
	}),

	actions: {
		scrollToSection(event) {
			event.preventDefault();

			this.win.scrollToAnimated(
				window.pageYOffset +
					document.querySelector(event.target.hash).getBoundingClientRect().top
			);
		},
	},

	titleToken(model) {
		return model.meta.title;
	},

	model(params) {
		return this.get('staticContent').read(`/projects/${params.project_id}`);
	},
});
