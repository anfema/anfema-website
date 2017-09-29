import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { equal, readOnly } from '@ember/object/computed';

export default Component.extend({
	classNames: ['language-select'],
	router: service(),

	locale: readOnly('intl.locale.0'),

	isEn: equal('locale', 'en'),
	isDe: equal('locale', 'de'),

	actions: {
		setLocale(locale) {
			// Please note that the code below is using private APIs and *will* brake in future
			// releases of Ember.js. This is okay, as future release hopefully provide a working
			// transitionTo method for the router service as well as an easier way to collect
			// necessary params.
			//
			//  — f.pichler
			//
			const router = this.get('router');
			const currentRoute = router.get('currentRouteName');
			const routerParams = router._router.currentState.routerJs.state.params;
			const params = [];

			for (const key in routerParams) {
				if (routerParams.hasOwnProperty(key)) {
					const param = routerParams[key];

					for (const paramKey in param) {
						if (paramKey === 'language_id') {
							params.push(locale);
						} else {
							params.push(param[paramKey]);
						}
					}
				}
			}

			router.transitionTo(router.get('currentRouteName'), ...params, {
				queryParams: router._router.currentState.routerJs.state.queryParamsFor[currentRoute],
			});
		},
	},
});
