import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

// Replaces the language code in the current url with target language.
// Assumes that url contains language code between the first two slashes.
export function generateLangUrl(currentURL, targetLang) {
	return currentURL.replace(/^\/(?:(?!\/).)*/g, `/${targetLang}`);
}

export default Component.extend({
	router: service(),
	win: service(),

	englishLink: computed('router.currentURL', function() {
		return generateLangUrl(this.router.currentURL, 'en');
	}),

	germanLink: computed('router.currentURL', function() {
		return generateLangUrl(this.router.currentURL, 'de');
	}),

	actions: {
		onLinkClick() {
			this.get('win').scrollToTop();
		},
	},
});
