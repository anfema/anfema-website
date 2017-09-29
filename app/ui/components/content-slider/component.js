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
	/** @type {number} */
	slideDirection: 0,

	onPrevious: undefined,
	onNext: undefined,

	/*
	 * state
	 */

	/** @type {number | undefined} */
	_dragStartPosition: undefined,
	/** @type {number} */
	_dragOffset: 0,
	/** @type {boolean} */
	_isTransitioning: false,

	/** @returns {number} */
	_currentIndex: computed('data.@each', 'selected', function () {
		return this.data.findIndex(data => data === this.selected);
	}),

	/** @returns {number} */
	_logoStep: computed('data.@each', 'selected', function() {
		return this.get('_currentSlide').logoStep;
	}),

	/** @returns {boolean} */
	_previousDisabled: computed('cycle', '_currentIndex', '_isTransitioning', function() {
		const currentIndex = this.get('_currentIndex');

		return (!this.cycle && currentIndex < 0) || this._isTransitioning;
	}),

	/** @returns {boolean} */
	_nextDisabled: computed('cycle', 'data', '_currentIndex', '_isTransitioning', function() {
		const currentIndex = this.get('_currentIndex');

		return (!this.cycle && currentIndex > this.data.length - 1) || this._isTransitioning;
	}),

	/** @returns {object} */
	_previousSlide: computed('cycle', 'data.@each', '_currentIndex', function() {
		const currentIndex = this.get('_currentIndex');

		return this.cycle || currentIndex > 0
			? this.data[ mod(currentIndex - 1, this.data.length) ]
			: undefined;
	}),

	/** @returns {object} */
	_currentSlide: computed('data.@each', 'selected', function () {
		return this.data.find(data => data === this.selected);
	}),

	/** @returns {object} */
	_nextSlide: computed('cycle', 'data.@each', '_currentIndex', function() {
		const _currentIndex = this.get('_currentIndex');

		return this.cycle || _currentIndex < this.data.length - 1
			? this.data[mod(_currentIndex + 1, this.data.length) ]
			: undefined;
	}),

	/** @returns {number} */
	_sliderStyle: computed('selected', '_dragOffset', '_dragStartPosition', 'slideDirection', function () {
		const userIsInteracting = this._dragStartPosition !== undefined;
		const initTransition = this.slideDirection !== 0;
		const wasDragging = this._dragOffset !== 0 && !userIsInteracting;

		//  0: right slide
		// -1: middle slide
		// -2: left slide
		const fullOffset = (this.slideDirection - 1) * 100;

		if (initTransition || wasDragging) {
			// immediately trigger a rerender to transition to the center pane
			Ember.run.next(this, () => {
				this.setProperties({
					slideDirection: 0,
					_dragStartPosition: undefined,
					_dragOffset: 0,
				});
			});
		}

		return htmlSafe(
			`transform: translate(calc(${fullOffset}% + ${this._dragOffset}px));` +
			// disable transition while user is interacting
			(initTransition || userIsInteracting ? 'transition: none;' : '')
		);
	}),

	_sliderExtraClass: computed('_dragStartPosition', '_isTransitioning', function () {
		const userIsInteracting = this._dragStartPosition !== undefined;

		return userIsInteracting || this._isTransitioning
			? 'content-slider__slider__transitioning'
			: 'content-slider__slider__steady';
	}),

	actions: {
		slideToPrevious() {
			const currentIndex = this.get('_currentIndex');

			if (this.onPrevious && (this.cycle || this._currentIndex > 0)) {
				this.onPrevious(this.data[mod(currentIndex - 1, this.data.length)]);
			}
		},

		slideToNext() {
			const currentIndex = this.get('_currentIndex');

			if (this.onNext && (this.cycle || this._currentIndex < this.data.length - 1)) {
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
			this.set('_isTransitioning', false);
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
		if (this._dragStartPosition === undefined) {
			this.setProperties({
				_dragStartPosition: startPos,
				_dragOffset: 0
			});
		}
	},

	endDrag() {
		if (this._dragStartPosition !== undefined) {
			const offset = this.get('_dragOffset');
			const _currentIndex = this.get('_currentIndex');
			const sliderWidth = this.element.querySelector('.content-slider__slidewindow').clientWidth;

			if (Math.abs(offset) / sliderWidth > 0.3) {
				if (this.onPrevious && offset > 0 && (this.cycle || _currentIndex > 0)) {
					this.onPrevious(this.data[mod(_currentIndex - 1, this.data.length)]);
				}
				else if (this.onNext && offset < 0 && (this.cycle || _currentIndex < this.data.length - 1)) {
					this.onNext(this.data[mod(_currentIndex + 1, this.data.length)]);
				}
				this.setProperties({
					_dragStartPosition: undefined,
				});
			}
			else {
				this.setProperties({
					_dragStartPosition: undefined,
				});
			}
		}
	},

	/**
	 * @argument element {HTMLElement}
	 * @argument newPos {number}
	*/
	updateDrag(newPos) {
		if (this._dragStartPosition !== undefined && this.slideDirection === 0) {
			this.set('_dragOffset', newPos - this._dragStartPosition);
		}
	},
});

function mod(n, m) {
	return ((n % m) + m) % m;
}
