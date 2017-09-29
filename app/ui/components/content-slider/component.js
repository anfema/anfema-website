import Component from '@ember/component';
import { computed } from '@ember/object';
import Ember from 'ember';
import { htmlSafe } from '@ember/string';

export default Component.extend({
	classNames: ['content-slider'],

	/*
	 * props
	 */

	/** @type {string} */
	slideComponentName: undefined,
	/** @type {object[]} */
	data: null,
	/** @type {object} */
	selected: null,
	/** @type {boolean} */
	cycle: true,

	onPrevious: undefined,
	onNext: undefined,

	/*
	 * state
	 */

	/** @type {number | undefined} */
	dragStartPosition: undefined,
	/** @type {number} */
	slideDirection: 0,
	/** @type {number} */
	dragOffset: 0,
	/** @type {boolean} */
	isTransitioning: false,

	/** @returns {number} */
	currentIndex: computed('data.@each', 'selected', function () {
		return this.get('data').findIndex(data => data === this.get('selected'));
	}),

	/** @returns {number} */
	logoStep: computed('data.@each', 'selected', function() {
		return this.get('currentSlide').logoStep;
	}),

	/** @returns {boolean} */
	previousDisabled: computed('cycle', 'currentIndex', 'isTransitioning', function() {
		const currentIndex = this.get('currentIndex');

		return (!this.cycle && currentIndex < 0) || this.isTransitioning;
	}),

	/** @returns {boolean} */
	nextDisabled: computed('cycle', 'data', 'currentIndex', 'isTransitioning', function() {
		const currentIndex = this.get('currentIndex');

		return (!this.cycle && currentIndex > this.data.length - 1) || this.isTransitioning;
	}),

	/** @returns {object} */
	previousSlide: computed('cycle', 'data.@each', 'currentIndex', function() {
		const currentIndex = this.get('currentIndex');

		if (this.cycle || currentIndex > 0) {
			return this.data[ mod(currentIndex - 1, this.data.length) ];
		}
		else {
			return undefined;
		}
	}),

	/** @returns {object} */
	currentSlide: computed('data.@each', 'selected', function () {
		return this.get('data').find(data => data === this.get('selected'));
	}),

	/** @returns {object} */
	nextSlide: computed('cycle', 'data.@each', 'currentIndex', function() {
		const currentIndex = this.get('currentIndex');

		if (this.cycle || currentIndex < this.data.length - 1) {
			return this.data[mod(currentIndex + 1, this.data.length) ];
		}
		else {
			return undefined;
		}
	}),

	/** @returns {number} */
	sliderStyle: computed('selected', 'dragOffset', 'dragStartPosition', 'slideDirection', function () {
		const userIsInteracting = this.dragStartPosition !== undefined;
		const initTransition = this.slideDirection !== 0;
		const wasDragging = this.dragOffset !== 0 && !userIsInteracting;

		//  0: right slide
		// -1: middle slide
		// -2: left slide
		const fullOffset = (this.slideDirection - 1) * 100;

		if (initTransition || wasDragging) {
			// immediately trigger a rerender to transition to the center pane
			Ember.run.next(this, () => {
				this.setProperties({
					slideDirection: 0,
					dragStartPosition: undefined,
					dragOffset: 0,
				});
			});
		}

		return htmlSafe(
			`transform: translate(calc(${fullOffset}% + ${this.dragOffset}px));` +
			// disable transition while user is interacting
			(initTransition || userIsInteracting ? 'transition: none;' : '')
		);
	}),

	sliderExtraClass: computed('dragStartPosition', 'isTransitioning', function () {
		const userIsInteracting = this.dragStartPosition !== undefined;

		return userIsInteracting || this.isTransitioning
			? 'content-slider__slider__transitioning'
			: 'content-slider__slider__steady';
	}),

	actions: {
		slideToPrevious() {
			const currentIndex = this.get('currentIndex');

			if (this.onPrevious && (this.cycle || this.currentIndex > 0)) {
				this.onPrevious(this.data[mod(currentIndex - 1, this.data.length)]);
			}
		},

		slideToNext() {
			const currentIndex = this.get('currentIndex');

			if (this.onNext && (this.cycle || this.currentIndex < this.data.length - 1)) {
				this.onNext(this.data[mod(currentIndex + 1, this.data.length)]);
			}
		},
	},

	/*
	 * lifecycle
	 */

	init() {
		this._super(...arguments)
		this.oldAttrs = [];
		this.onTransitionEnd = () => {
			this.set('isTransitioning', false);
		}
	},

	didInsertElement() {
		this.element.querySelector('.content-slider__slider')
			.addEventListener('transitionend', this.onTransitionEnd);
	},

	willDestroyElement() {
		this.element.querySelector('.content-slider__slider')
			.removeEventListener('transitionend', this.onTransitionEnd);
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
		this.updateDrag(e.touches[0].clientX)
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

	/*
	 * private methods
	 */

	/** @argument startPos {number} */
	startDrag(startPos) {
		if (this.dragStartPosition === undefined) {
			this.setProperties({
				dragStartPosition: startPos,
				dragOffset: 0
			});
		}
	},

	endDrag() {
		if (this.dragStartPosition !== undefined) {
			const offset = this.get('dragOffset');
			const currentIndex = this.get('currentIndex');
			const sliderWidth = this.element.querySelector('.content-slider__slidewindow').clientWidth;

			if (Math.abs(offset) / sliderWidth > 0.3) {
				if (this.onPrevious && offset > 0 && (this.cycle || currentIndex > 0)) {
					this.onPrevious(this.data[mod(currentIndex - 1, this.data.length)]);
				}
				else if (this.onNext && offset < 0 && (this.cycle || currentIndex < this.data.length - 1)) {
					this.onNext(this.data[mod(currentIndex + 1, this.data.length)]);
				}
				this.setProperties({
					dragStartPosition: undefined,
				});
			}
			else {
				this.setProperties({
					dragStartPosition: undefined,
				});
			}
		}
	},

	/**
	 * @argument element {HTMLElement}
	 * @argument newPos {number}
	*/
	updateDrag(newPos) {
		if (this.dragStartPosition !== undefined && this.slideDirection === 0) {
			this.set('dragOffset', newPos - this.dragStartPosition);
		}
	},
});

function mod(n, m) {
	return ((n % m) + m) % m;
}
