import Component from '@ember/component';
import { throttle } from '@ember/runloop';
import { computed } from '@ember/object';

export default Component.extend({
	scrollTop: 0,
	forceOpaque: false,

	isTransparent: computed('scrollTop', 'forceOpaque', function() {
		return !this.forceOpaque && this.scrollTop === 0;
	}),

	willInsertElement() {
		this._updateScrollPosition();
	},

	didInsertElement() {
		if (window) {
			this._scrollEventListener = () =>
				throttle(this, () => this._updateScrollPosition(), 200);

			window.addEventListener('scroll', this._scrollEventListener);
		}
	},

	willRemoveElement() {
		if (window) {
			window.removeEventListener('scroll', this._scrollEventListener);
		}
	},

	_updateScrollPosition() {
		if (!this.isDestroyed) {
			this.set('scrollTop', window.scrollY);
		}
	},
});
