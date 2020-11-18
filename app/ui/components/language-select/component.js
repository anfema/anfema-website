import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';

// Replaces the language code in the current url with target language.
// Assumes that url contains language code between the first two slashes.
export function generateLangUrl(router, targetLang) {
	const currentUrl = get(router, '_router.currentURL');

	return currentUrl.replace(/^\/(?:(?!\/).)*/g, `/${targetLang}`);
}

export default Component.extend({
	router: service(),
	win: service(),

	isEnglish: computed('router._router.currentURL', function() {
		return (this.get('router._router.currentURL') || '').match(/^\/en/);
	}),

	englishLink: computed('router._router.currentURL', function() {
		return generateLangUrl(this.router, 'en');
	}),

	germanLink: computed('router._router.currentURL', function() {
		return generateLangUrl(this.router, 'de');
	}),

	actions: {
		onLinkClick(targetLang, event) {
			event.preventDefault();

			this.router.transitionTo(generateLangUrl(this.router, targetLang));

			this.win.scrollToTop();
		},
	},
});
