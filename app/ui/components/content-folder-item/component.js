import Component from '@ember/component';
import { computed } from '@ember/object';
import { next } from '@ember/runloop';

export default Component.extend({
	classNameBindings: ['isActive:content-folder-item--active'],

	content: null,
	selected: null,

	isActive: computed('content.id', 'selected', function() {
		return this.get('content.id') === this.get('selected');
	}),

	didReceiveAttrs() {
		this._setContentHeight();

		if (!this.get('isActive')) {
			// Wait one tick, then call setContentHeight again, this time resetting the style
			next(this, '_setContentHeight', null);
		}
	},

	didInsertElement() {
		this._content = this.element.querySelector('.content-folder-item__content');

		this._contentTransitionEnd = event => {
			if (this.get('isActive')) {
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
