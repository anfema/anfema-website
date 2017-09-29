import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
	intl: service(),

	beforeModel(transition) {
		// redirect to en index route
		if (!transition.params.language || !transition.params.language.language_id) {
			this.transitionTo('language', 'en');

			return this.get('intl').setLocale('en');
		} else {
			const paramLanguage = transition.params.language.language_id;
			const availableLanguages = this.get('intl.locales');

			if (!availableLanguages.includes(paramLanguage)) {
				this.transitionTo('language', 'en');

				return this.get('intl').setLocale('en');
			} else {
				return this.get('intl').setLocale(transition.params.language.language_id);
			}
		}
	},
});
