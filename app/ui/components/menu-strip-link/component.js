import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';

export default Component.extend({
	tagName: 'a',
	classNames: ['menu-strip-link'],
	classNameBindings: ['isActive'],
	attributeBindings: ['href'],

	queryParams: null,
	activeClass: null,
	onClick: null,

	_router: service('router'),

	href: computed('queryParams', '_router.currentRouteName', function() {
		const router = this.get('_router');

		return router.urlFor(router.get('currentRouteName'), {
			queryParams: this.get('queryParams'),
		});
	}),

	click(e) {
		if (this.onClick) {
			e.preventDefault();
			this.onClick(e);
		}
	},

	isActive: computed('activeClass', 'queryParams', '_router.currentURL', function() {
		const router = this.get('_router');
		const activeClass = this.activeClass ? this.activeClass : 'menu-strip-link__active';
		const currentQueryParams = parseQueryParams(get(window, 'location.search'));
		const queryParams = this.get('queryParams');

		// TODO use version below, when https://github.com/emberjs/ember.js/pull/15613/files
		// is merged
		const isActive = Object.keys(queryParams).every(key => currentQueryParams[key] === this.queryParams[key]);

		// const isActive = router.isActive(router.get('currentRouteName'), {
		// 	queryParams: this.get('queryParams')
		// });

		return isActive ? activeClass : '';
	}),
});

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
