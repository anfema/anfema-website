import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({
	intl: service(),
	fastboot: service(),
	headData: service(),

	title(tokens) {
		tokens.reverse();
		tokens.push('anfema GmbH');

		return tokens.join(' - ');
	},

	setTitle(title) {
		this.headData.set('title', title);
	},

	async beforeModel(transition) {
		const locales = this.get('intl.locales');
		const defaultLocale = locales[0];

		let expectedLocale = this._guessLocale(
			get(transition, 'params.language.language_id'),
			locales,
			defaultLocale
		);

		// Bail if our guess does return an unknown locale
		if (!locales.includes(expectedLocale)) {
			this.transitionTo('language', defaultLocale);

			expectedLocale = defaultLocale;
		}

		await this.get('intl').setLocale(expectedLocale);
	},

	_guessLocale(expectedLocale, locales, defaultLocale) {
		if (expectedLocale && expectedLocale !== 'undefined') {
			return expectedLocale;
		}

		if (this.get('fastboot.isFastBoot')) {
			const headers = this.get('fastboot.request.headers');
			const acceptLanguage = headers.get('accept-language'); // this is not Ember.get!

			// Bail if headers is empty
			if (!acceptLanguage) {
				return defaultLocale;
			}

			// spreading a set of the values found in the string to extract unique entries
			const acceptedLanguages = [
				...new Set(
					acceptLanguage
						.split(/,\s?/) // 'accept-language' is a comma separated list
						.map(lang => lang.substr(0, 2)) // we only care for the 2 letter identifier, not the weight
				),
			];

			return acceptedLanguages[0];
		}

		if (!this.get('fastboot.isFastBoot')) {
			return this._guessBrowserLocale();
		}

		return defaultLocale;
	},

	_guessBrowserLocale() {
		const browserLanguage = (
			window.navigator.language ||
			(window.navigator.languages && window.navigator.languages[0]) ||
			''
		).substr(0, 2);

		return browserLanguage;
	},
});
