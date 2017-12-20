import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { readOnly } from '@ember/object/computed';

/**
 * Find the id for the first item in a list of contents
 *
 * @param {any} model a model
 * @param {String} name the component name
 * @param {String} path the path
 * @returns {String} id
 */
function findByComponentNameAndPath(model, name, path) {
	if (model && model.sections) {
		return get(model.sections.find(s => s.component === name), path);
	}

	return null;
}

export default Controller.extend({
	queryParams: ['service', 'team'],

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

	service: computed(function() {
		return findByComponentNameAndPath(
			this.get('staticContent').readShoebox('/index'),
			'content-lp-services',
			'services.0.id'
		);
	}),

	team: computed(function() {
		return findByComponentNameAndPath(
			this.get('staticContent').readShoebox('/index'),
			'content-lp-team',
			'reasons.0.id'
		);
	}),

	actions: {
		scrollToSection(event) {
			event.preventDefault();

			this.get('win').scrollToAnimated(
				document.body.scrollTop +
					document.querySelector(event.srcElement.hash).getBoundingClientRect().top
			);
		},
	},
});
