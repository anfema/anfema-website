import Component from '@ember/component';
import { computed } from '@ember/object';
import Ember from 'ember';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';

export default Component.extend({
	classNames: ['menu-strip'],
	classNameBindings: ['isInteracting'],

	fastboot: service(),

	/** @type {object[]} */
	items: null,
	/** @type {object} */
	selected: undefined,
	onChange: undefined,

	/** @type {number | undefined} */
	_dragStartPosition: undefined,
	_dragOffset: 0,
	/** @type {number} */
	_scrollOffset: 0,
	/** @type {number} */
	_scrollPosition: 0,
	/** @type {boolean} */
	_isTransitioning: false,
	_oldSelected: undefined,

	isInteracting: computed('_dragStartPosition', function() {
		return this._dragStartPosition !== undefined;
	}),

	actions: {
		onItemSelected(item) {
			// Firefox generates click events even after dragging, so
			// only call callback, when we did not drag.
			if (this._dragOffset === 0 && this.onChange && this.selected !== item) {
				this.onChange(item);
			}
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
	 * event listeners
	 */
	touchStart(e) {
		this.startDrag(e.touches[0].clientX);
	},
	touchEnd(e) {
		this.endDrag();
	},
	touchMove(e) {
		this.updateDrag(e.touches[0].clientX);
	},
	mouseDown(e) {
		this.startDrag(e.clientX);
	},
	mouseUp(e) {
		this.endDrag();
	},
	mouseLeave(e) {
		this.endDrag();
	},
	mouseMove(e) {
		this.updateDrag(e.clientX);
	},
	dragStart(e) {
		return false;
	},

	/*
	 * private methods
	 */

	startDrag(startPos) {
		if (this._dragStartPosition === undefined) {
			this.setProperties({
				_dragStartPosition: startPos,
				_dragOffset: 0,
				_scrollPosition: this.element.scrollLeft,
			});
		}
	},

	endDrag() {
		if (this._dragStartPosition !== undefined) {
			this.setProperties({
				_dragStartPosition: undefined,
				_scrollPosition: 0,
			});
		}
	},

	/**
	 * @argument newPos {number}
	 */
	updateDrag(newPos) {
		if (this.get('fastboot.isFastBoot')) {
			return;
		}

		if (this._dragStartPosition !== undefined) {
			const offset = this._dragStartPosition - newPos;

			this.setProperties({
				_dragOffset: offset,
			});

			this.element.scrollLeft = this._scrollPosition + offset;
		}
	},

	scrollToSelectedItem() {
		if (this.get('fastboot.isFastBoot')) {
			return;
		}

		const index = this.items.findIndex(item => item === this.selected);

		if (index != -1 && this.element) {
			const sliderElement = this.element.querySelector('.menu-strip__slider');
			const element = sliderElement.children.item(index);

			if (element) {
				const left = element.offsetLeft;
				const width = element.clientWidth;

				this.element.scrollLeft = left - width;
			}
		}
	},
});
