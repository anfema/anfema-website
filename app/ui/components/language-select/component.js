import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {equal, readOnly} from '@ember/object/computed';

export default Component.extend({
	classNames: ['language-select'],
	router: service(),
	intl: service(),

	locale: readOnly('intl.locale.0'),

	isEn: equal('locale', 'en'),
	isDe: equal('locale', 'de'),

	actions: {
		setLocale(locale) {
			let currentRouteName = this.get('router').get('currentRouteName');
			const currentUrl = this.get('router').urlFor(currentRouteName);

			this.get('intl').setLocale(locale);

			if (new RegExp('projects/.').test(currentUrl)) {
				const project = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

				this.get('router').transitionTo(currentRouteName, locale, project);
			} else {
				this.get('router').transitionTo('language', locale, {
					queryParams: {
						service: null,
						team: null,
					}
				});
			}
		},
	},
});
