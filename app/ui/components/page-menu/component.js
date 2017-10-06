import Component from '@ember/component';
import { throttle } from '@ember/runloop';
import { computed } from '@ember/object';

export default Component.extend({
	classNameBindings: ['isTransparent:page-menu--transparent'],

	scrollTop: 0,

	startTransparent: false,

	isTransparent: computed('scrollTop', 'startTransparent', function() {
		return this.get('startTransparent') && this.get('scrollTop') === 0;
	}),

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
