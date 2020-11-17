import Component from '@ember/component';
import { computed } from '@ember/object';
import { next } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import { action } from '@ember/object';

const FlickProportion = 0.15;

function mod(n, m) {
	return ((n % m) + m) % m;
}

export default Component.extend({
	tagName: 'div',
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

	/**
	 * @type {number | undefined}
	 */
	_dragStartPosition: undefined,

	/**
	 * @type {number}
	 */
	_dragOffset: 0,

	/**
	 * @type {boolean}
	 */
	_isTransitioning: false,
	_oldSelected: undefined,

	/** @returns {number} */
	_currentIndex: computed('data.@each', 'selected', function() {
		const selected = this.selected;

		return this.data.findIndex(data => data === selected);
	}),

	/** @returns {number} */
	_logoStep: computed('data.@each', 'selected', function() {
		return this._currentSlide.logoStep;
	}),

	/** @returns {boolean} */
	_previousDisabled: computed('cycle', '_currentIndex', '_isTransitioning', function() {
		const currentIndex = this._currentIndex;
		const cycle = this.cycle;

		return this._isTransitioning || (!cycle && currentIndex === 0);
	}),

	/** @returns {boolean} */
	_nextDisabled: computed('cycle', 'data', '_currentIndex', '_isTransitioning', function() {
		const currentIndex = this._currentIndex;
		const data = this.data;
		const cycle = this.cycle;

		return this._isTransitioning || (!cycle && currentIndex === data.length - 1);
	}),

	/** @returns {object} */
	_previousSlide: computed('cycle', 'data.@each', '_currentIndex', function() {
		const currentIndex = this._currentIndex;

		return this.cycle || currentIndex > 0
			? this.data[mod(currentIndex - 1, this.data.length)]
			: undefined;
	}),

	/** @returns {object} */
	_currentSlide: computed('data.@each', 'selected', function() {
		return this.data.find(data => data === this.selected);
	}),

	/** @returns {object} */
	_nextSlide: computed('cycle', 'data.@each', '_currentIndex', function() {
		const _currentIndex = this._currentIndex;

		return this.cycle || _currentIndex < this.data.length - 1
			? this.data[mod(_currentIndex + 1, this.data.length)]
			: undefined;
	}),

	/** @returns {number} */
	_sliderStyle: computed(
		'selected',
		'_dragOffset',
		'_dragStartPosition',
		'slideDirection',
		function() {
			const userIsInteracting = this._dragStartPosition !== undefined;
			const initTransition = this.slideDirection !== 0;
			const wasDragging = this._dragOffset !== 0 && !userIsInteracting;

			//  0: right slide
			// -1: middle slide
			// -2: left slide
			const fullOffset = (this.slideDirection - 1) * 100;

			if (initTransition || wasDragging) {
				// immediately trigger a rerender to transition to the center pane
				next(this, () => {
					this.setProperties({
						slideDirection: 0,
						_dragStartPosition: undefined,
						_dragOffset: 0,
					});
				});
			}

			return htmlSafe(
				`transform: translate(calc(${fullOffset}% + ${this._dragOffset}px));${
					// disable transition while user is interacting
					initTransition || userIsInteracting ? 'transition: none;' : ''
				}`
			);
		}
	),

	_sliderExtraClass: computed('_dragStartPosition', '_isTransitioning', function() {
		const userIsInteracting = this._dragStartPosition !== undefined;

		return userIsInteracting || this._isTransitioning
			? 'content-slider__slider--transitioning'
			: 'content-slider__slider--steady';
	}),

	@action
	slideToPrevious() {
		if (this.cycle || this._currentIndex > 0) {
			this.transitionToPrevious();
		}
	},

	@action
	slideToNext() {
		if (this.cycle || this._currentIndex < this.data.length - 1) {
			this.transitionToNext();
		}
	},

	/*
	 * lifecycle
	 */
	init() {
		this._super(...arguments);
		this.oldAttrs = [];

		this.onTransitionEnd = e => {
			if (e.propertyName === 'transform') {
				this.set('_isTransitioning', false);
			}
		};
	},

	didReceiveAttrs() {
		this._super(...arguments);

		if (this._oldSelected === this.selected) {
			this.set('_isTransitioning', true);
		}
		this._oldSelected = this.selected;
	},

	didInsertElement() {
		const element = this.element.querySelector('.content-slider__slider');

		element.addEventListener('transitionend', this.onTransitionEnd);
		element.addEventListener('transitioncancel', this.onTransitionEnd);
	},

	willDestroyElement() {
		const element = this.element.querySelector('.content-slider__slider');

		element.removeEventListener('transitionend', this.onTransitionEnd);
		element.removeEventListener('transitioncancel', this.onTransitionEnd);
	},

	/*
	 * event listeners
	 */

	// TODO: refactor to use template-based events
	// https://deprecations.emberjs.com/v3.x/#toc_component-mouseenter-leave-move

	@action
	handleTouchStart(e) {
		this.startDrag(e.touches[0].clientX);
	},

	@action
	handleTouchEnd(e) {
		this.endDrag();
	},

	@action
	handleTouchMove(e) {
		this.updateDrag(e.touches[0].clientX);
	},

	@action
	handleMouseDown(e) {
		this.startDrag(e.clientX);
	},

	@action
	handleMouseUp(e) {
		this.endDrag();
	},

	@action
	handleMouseLeave(e) {
		this.endDrag();
	},

	@action
	handleMouseMove(e) {
		this.updateDrag(e.clientX);
	},

	/*
	 * private methods
	 */

	/**
	 * @param {Number} startPos starting position
	 * @return {undefined}
	 * */
	startDrag(startPos) {
		if (this._dragStartPosition === undefined && !this._isTransitioning) {
			this.setProperties({
				_dragStartPosition: startPos,
				_dragOffset: 0,
			});
		}
	},

	endDrag() {
		if (this._dragStartPosition !== undefined) {
			const offset = this._dragOffset;
			const currentIndex = this._currentIndex;
			const sliderWidth = this.element.querySelector('.content-slider__slidewindow')
				.clientWidth;

			if (Math.abs(offset) / sliderWidth > FlickProportion) {
				if (offset > 0 && (this.cycle || currentIndex > 0)) {
					this.transitionToPrevious();
				} else if (
					this.onNext &&
					offset < 0 &&
					(this.cycle || currentIndex < this.data.length - 1)
				) {
					this.transitionToNext();
				}
				this.setProperties({
					_dragStartPosition: undefined,
				});
			} else {
				this.setProperties({
					_dragStartPosition: undefined,
				});
			}
		}
	},

	/**
	 * @param {Number} newPos new position
	 *
	 * @return {undefined}
	 */
	updateDrag(newPos) {
		if (this._dragStartPosition !== undefined && this.slideDirection === 0) {
			this.setProperties({
				_dragOffset: newPos - this._dragStartPosition,
				_isTransitioning: true,
			});
		}
	},

	transitionToPrevious() {
		const currentIndex = this._currentIndex;
		const prevSlide = this.data[mod(currentIndex - 1, this.data.length)];

		if (this.onPrevious) {
			this.onPrevious(prevSlide);
		}
		// TODO
		this.set('_isTransitioning', true);
	},

	transitionToNext() {
		const currentIndex = this._currentIndex;
		const nextSlide = this.data[mod(currentIndex + 1, this.data.length)];

		if (this.onPrevious) {
			this.onNext(nextSlide);
		}
		// TODO
		this.set('_isTransitioning', true);
	},
});
