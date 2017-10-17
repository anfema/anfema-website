import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

// Replaces the language code in the current url with target language.
// Assumes that url contains language code between the first two slashes.
export function generateLangUrl(router, targetLang) {
	const currentUrl = router._router.currentURL;

	return currentUrl.replace(/^\/(?:(?!\/).)*/g, `/${targetLang}`);
}

export default Component.extend({
	router: service(),

	isEnglish: computed('router._router.currentURL', function() {
		return (this.get('router._router.currentURL') || '').match(/^\/en/);
	}),

	englishLink: computed('router._router.currentURL', function() {
		return generateLangUrl(this.get('router'), 'en');
	}),

	germanLink: computed('router._router.currentURL', function() {
		return generateLangUrl(this.get('router'), 'de');
	}),

	actions: {
		onLinkClick(targetLang, event) {
			event.preventDefault();
			this.get('router').transitionTo(generateLangUrl(this.get('router'), targetLang));
		},
	},
});
