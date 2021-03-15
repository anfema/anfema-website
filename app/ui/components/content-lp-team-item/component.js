import Component from '@ember/component';
import { next } from '@ember/runloop';

export default Component.extend({
	classNameBindings: ['isActive:content-lp-team-item--active'],

	// data: null,
	// selected: null,

	/* isActive: computed('data.id', 'selected', function() {
		console.log('selcted: ', this.selected);
		return this.get('data.id') === this.selected;
	}), */

	didReceiveAttrs() {
		this._setContentHeight();

		if (!this.isActive) {
			// Wait one tick, then call setContentHeight again, this time resetting the style
			next(this, '_setContentHeight', null);
		}
	},

	didInsertElement() {
		this._content = this.element.querySelector('.content-lp-team-item__content');

		this._contentTransitionEnd = () => {
			if (this.isActive) {
				this._setContentHeight('auto');
			}
		};

		this._content.addEventListener('transitionend', this._contentTransitionEnd);
	},

	willRemoveElement() {
		this._content.removeEventListener('transitionend', this._contentTransitionEnd);
	},

	_setContentHeight(height = true) {
		if (!this._content) {
			return;
		}

		if (height === true) {
			height = this._content.scrollHeight;
		}

		if (typeof height === 'number') {
			height = `${height}px`;
		}

		this._content.style.height = height;
	},
});
