import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import config from 'anfema/config/environment';

export default Route.extend({
	intl: service(),
	fastboot: service(),

	beforeModel(transition) {
		const intl = this.get('intl');
		let defaultLang = config.i18n.defaultLocale;

		if (!this.get('fastboot.isFastBoot')) {
			defaultLang = config.i18n.defaultLocale;
		} else {
			const headers = this.get('fastboot.request.headers');
			const browserLng = headers.get('accept-language');

			if (browserLng === 'de') {
				defaultLang = browserLng;
			} else {
				defaultLang = 'en';
			}
		}

		// redirect to en index route
		if (!transition.params.language || !transition.params.language.language_id) {
			this.transitionTo('language', defaultLang);

			return intl.setLocale(defaultLang);
		}
		const paramLanguage = transition.params.language.language_id;
		const availableLanguages = this.get('intl.locales');

		if (!availableLanguages.includes(paramLanguage)) {
			this.transitionTo('language', defaultLang);

			return intl.setLocale(defaultLang);
		}

		return intl.setLocale(transition.params.language.language_id);
	},
});
