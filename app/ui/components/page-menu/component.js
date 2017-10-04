import Component from '@ember/component';
import { throttle } from '@ember/runloop';
import { gt } from '@ember/object/computed';

export default Component.extend({
	classNameBindings: ['isFloating:page-menu--floating'],

	scrollTop: 0,

	isFloating: gt('scrollTop', 0),

	didInsertElement() {
		if (!window) {
			return;
		}

		this._scrollEventListener = () =>
			throttle(
				this,
				() => {
					if (!this.isDestroyed) {
						this.set('scrollTop', window.scrollY);
					}
				},
				200
			);

		window.addEventListener('scroll', this._scrollEventListener);
	},

	willRemoveElement() {
		if (!window) {
			return;
		}

		window.removeEventListener('scroll', this._scrollEventListener);
	},
});
