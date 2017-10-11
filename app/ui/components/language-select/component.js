import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
	router: service(),

	isEnglish: computed('router._router.currentURL', function() {
		return (this.get('router._router.currentURL') || '').match(/^\/en/);
	}),
});
