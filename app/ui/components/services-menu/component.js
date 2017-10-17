import Component from '@ember/component';
import { computed } from '@ember/object';
import Ember from 'ember';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';

export default Component.extend({
	classNames: ['menu-strip'],
	classNameBindings: ['isInteracting'],

	fastboot: service(),

	/**
	 * @type {object[]}
	 */
	items: null,

	/**
	 * @type {object}
	 */
	selected: undefined,

	// onChange: null,

	actions: {
		onItemSelected(item) {
			// Firefox generates click events even after dragging, so
			// only call callback, when we did not drag.
			if (this._dragOffset === 0 && this.onChange && this.selected !== item) {
				this.onChange(item);
			}
		},

		onItemClicked(item) {
			this.onChange(item);
		},
	},

	init() {
		this._super(...arguments);

		this.oldAttrs = [];
	},

	didReceiveAttrs() {
		this._super(...arguments);

		if (this._oldSelected !== this.selected) {
			this.scrollToSelectedItem();
		}

		this._oldSelected = this.selected;
	},

	didInsertElement() {
		this.scrollToSelectedItem();
	},

	/*
	 * private methods
	 */

	scrollToSelectedItem() {
		if (this.get('fastboot.isFastBoot')) {
			return;
		}
	},
});
