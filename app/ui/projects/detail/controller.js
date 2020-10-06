import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { readOnly } from '@ember/object/computed';

function findByComponentNameAndPath(model, name, path) {
	if (model && model.sections) {
		return get(model.sections.find(s => s.component === name), path);
	}

	return null;
}

export default Controller.extend({
	queryParams: 'topfeatures',

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

	topfeatures: computed(function() {
		return findByComponentNameAndPath(
			this.get('staticContent').readShoebox('/detail'),
			'project-features',
			'features.0.id'
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
});
