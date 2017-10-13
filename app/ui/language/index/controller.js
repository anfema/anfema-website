import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { oneWay } from '@ember/object/computed';
import scrollToAnimated from 'anfema/utils/scroll-to-animated';

/**
 * Find the id for the first item in a list of contents
 *
 * @param {any} model
 * @param {String} name
 * @param {String} path
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

	service: computed(function() {
		return findByComponentNameAndPath(
			this.get('staticContent').readShoebox('/index'),
			'services-content',
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
		scrollToSection(id) {
			scrollToAnimated(document.body.scrollTop + document.getElementById(id).getBoundingClientRect().top);
		},
	},
});
