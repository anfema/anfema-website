import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';

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
		return this.sections.reduce((acc, section) => {
			if (section.anchorId) {
				acc.push(section);
			}

			return acc;
		}, []);
	}),

	service: computed({
		get() {
			return findByComponentNameAndPath(
				this.staticContent.readShoebox('/index'),
				'content-lp-services',
				'services.0.id'
			);
		},
		// TODO: check if we set this somewhere
		// https://deprecations.emberjs.com/v3.x/#toc_computed-property-override
		set(key, value) {},
	}),

	team: computed({
		get() {
			return findByComponentNameAndPath(
				this.staticContent.readShoebox('/index'),
				'content-lp-team',
				'reasons.0.id'
			);
		},
		// TODO: check if we set this somewhere
		// https://deprecations.emberjs.com/v3.x/#toc_computed-property-override
		set(key, value) {},
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
