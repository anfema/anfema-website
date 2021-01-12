import Component from '@ember/component';
//import Component from '@glimmer/component';
import { computed, action } from '@ember/object';
import { next } from '@ember/runloop';
//import { tracked } from '@glimmer/tracking';

export default Component.extend({
	//classNameBindings: ['isActive:content-lp-team-item--active'],

	// data: null,
	// selected: null,

	//@tracked isActive = false;
	/* isActive: computed('data.id', 'selected', function() {

	}), */

	isActive: computed('data.id', 'selected', function() {
		return this.data.id === this.selected;
	}),

	//isActive: false,

	@action
	handleClick() {
		console.log('click: ', this.data.id);
		console.log('selected: ', this.selected);
		console.log('this.isActive before: ', this.isActive);
		this.isActive = true;

		console.log('this.isActive after: ', this.isActive);
	},

	init() {
		this._super(...arguments);
		this.oldAttrs = [];

		this.onTransitionEnd = e => {
			if (e.propertyName === 'transform') {
				console.log('onTransitionEnd was triggered');
				this.set('_isTransitioning', false);
			}
		};
	},

	didReceiveAttrs() {
		this._setContentHeight();

		if (!this.isActive) {
			// Wait one tick, then call setContentHeight again, this time resetting the style
			next(this, '_setContentHeight', null);
			console.log('not this.isActive');
		}
	},

	didInsertElement() {
		const element = this.element.querySelector('.content-lp-team-item__content');
		console.log('didInsertElement _content: ', element);

		this._contentTransitionEnd = () => {
			if (this.isActive) {
				this._setContentHeight('auto');
			}
		};

		//this._content.addEventListener('transitionend', this._contentTransitionEnd);
		element.addEventListener('transitionend', this.onTransitionEnd);
		element.addEventListener('transitioncancel', this.onTransitionEnd);
	},

	willRemoveElement() {
		console.log('willRemoveElement _content: ', element);
		const element = this.element.querySelector('.content-lp-team-item__content');

		//this._content.removeEventListener('transitionend', this._contentTransitionEnd);
		element.removeEventListener('transitionend', this.onTransitionEnd);
		element.removeEventListener('transitioncancel', this.onTransitionEnd);
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
