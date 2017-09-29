import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import config from 'anfema/config/environment';

export default Route.extend({
	intl: service(),

	beforeModel(transition) {
		const intl = this.get('intl');
		const defaultLang = config.i18n.defaultLocale;

		// redirect to en index route
		if (!transition.params.language || !transition.params.language.language_id) {
			this.transitionTo('language', defaultLang);

			return intl.setLocale(defaultLang);
		} else {
			const paramLanguage = transition.params.language.language_id;
			const availableLanguages = this.get('intl.locales');

			if (!availableLanguages.includes(paramLanguage)) {
				this.transitionTo('language', defaultLang);

				return intl.setLocale(defaultLang);
			} else {
				return intl.setLocale(transition.params.language.language_id);
			}
		}
	},
});
