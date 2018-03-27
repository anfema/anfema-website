import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import config from 'anfema/config/environment';

export default Route.extend({
	intl: service(),
	fastboot: service(),

	beforeModel(transition) {
		const intl = this.get('intl');
		let defaultLang = config.i18n.defaultLocale;
		let userLang = 'en';

		if (!this.get('fastboot.isFastBoot')) {
			defaultLang = config.i18n.defaultLocale;
		} else {
			const browserLang = this.get('fastboot.request.headers.accept-language');
			//console.log('browserLang: ', browserLang);

			if (browserLang.match(/de/)) {
				userLang = browserLang;
			} else {
				userLang = 'en';
			}
		}

		// redirect to en index route
		if (!transition.params.language || !transition.params.language.language_id) {
			this.transitionTo('language', userLang);

			return userLang;
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
