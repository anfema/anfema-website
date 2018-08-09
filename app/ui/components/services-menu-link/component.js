import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
	tagName: 'a',
	classNames: ['menu-strip-link'],
	classNameBindings: ['isActive'],
	attributeBindings: ['href'],

	queryParams: null,
	activeClass: 'menu-strip-link__active',
	onClick: () => {},

	router: service(),

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
		const isActive = this.router.isActive({
			queryParams: this.get('queryParams'),
		});

		return isActive ? this.activeClass : '';
	}),
});
