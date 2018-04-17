import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';

function parseQueryParams(searchString = '') {
	return searchString
		.substring(1)
		.split('&')
		.reduce((result, next) => {
			const [k, v] = next.split('=');

			result[decodeURIComponent(k)] = decodeURIComponent(v);

			return result;
		}, {});
}

export default Component.extend({
	tagName: 'a',
	classNames: ['menu-strip-link'],
	classNameBindings: ['isActive'],
	attributeBindings: ['href'],

	queryParams: null,
	activeClass: null,
	onClick: () => {},

	router: service('router'),

	href: computed('queryParams', 'router.currentRouteName', function() {
		const router = this.get('router');

		return router.urlFor(router.get('currentRouteName'), {
			queryParams: this.queryParams,
		});
	}),

	click(event) {
		if (this.onClick) {
			event.preventDefault();

			this.onClick(event);
		}
	},

	isActive: computed('activeClass', 'queryParams', 'router.currentURL', function() {
		// const router = this.get('router');
		const activeClass = this.activeClass ? this.activeClass : 'menu-strip-link__active';
		const currentQueryParams = parseQueryParams(get(window, 'location.search'));
		// const service = this.get('queryParams.service');

		// TODO use version below, when https://github.com/emberjs/ember.js/pull/15613/files
		// is merged
		const isActive =
			(currentQueryParams.service &&
				currentQueryParams.service === this.queryParams.service) ||
			(this.queryParams.service === 'concept' && !currentQueryParams.service);

		// const isActive = router.isActive(router.get('currentRouteName'), {
		// 	queryParams: this.get('queryParams')
		// });

		return isActive ? activeClass : '';
	}),
});
