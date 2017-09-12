import Component from '@ember/component';
import { throttle } from '@ember/runloop';
import { gt } from '@ember/object/computed';

export default Component.extend({
	classNameBindings: [':page-menu', 'isFloating:page-menu--floating'],

	scrollTop: 0,

	isFloating: gt('scrollTop', 0),

	didInsertElement() {
		if (!window) {
			return;
		}

		window.addEventListener('scroll', () =>
			throttle(this, () => this.set('scrollTop', window.scrollY), 200)
		);
	},
});
