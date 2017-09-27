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
	/** @type {object} */
	data: null,
	/** @type {string} data.id*/
	selectedId: null,
	/** @type {boolean} */
	cycle: true,

	/*
	 * state
	 */

	/** @type {Object} */
	oldAttrs: undefined,
	/** @type {number | undefined} */
	dragStartPosition: undefined,
	/** @type {number} */
	slideOffset: 0,
	/** @type {number} */
	dragOffset: 0,

	/** @returns {number} */
	currentIndex: computed('data.@each', 'selectedId', function () {
		return this.get('data').findIndex(data => data.id === this.get('selectedId'));
	}),

	/** @returns {number} */
	logoStep: computed('data.@each', 'selectedId', function() {
		return this.get('currentSlide').logoStep;
	}),

	/** @returns {boolean} */
	previousDisabled: computed('cycle', 'currentIndex', function() {
		return !this.cycle && this.get('currentIndex') <= 0;
	}),

	/** @returns {boolean} */
	nextDisabled: computed('cycle', 'data', 'currentIndex', function() {
		return !this.cycle && this.get('currentIndex') >= this.data.length - 1;
	}),

	/** @returns {object} */
	previousSlide: computed('data.@each', 'currentIndex', function() {
		const currentIndex = this.get('currentIndex');

		if (this.cycle || currentIndex > 0) {
			return this.data[ mod(currentIndex - 1, this.data.length) ];
		}
		else {
			return undefined;
		}
	}),

	/** @returns {object} */
	currentSlide: computed('data.@each', 'selectedId', function () {
		return this.get('data').find(data => data.id === this.get('selectedId'));
	}),

	/** @returns {object} */
	nextSlide: computed('data.@each', 'currentIndex', function() {
		const currentIndex = this.get('currentIndex');

		if (this.cycle || currentIndex < this.data.length - 1) {
			return this.data[mod(currentIndex + 1, this.data.length) ];
		}
		else {
			return undefined;
		}
	}),

	/** @returns {number} */
	sliderStyle: computed('selectedId', 'dragOffset', 'dragStartPosition', 'slideOffset', function () {
		const userIsInteracting = this.dragStartPosition !== undefined;
		const initTransition = this.slideOffset !== 0;

		//  0: right slide
		// -1: middle slide
		// -2: left slide
		const fullOffset = (this.slideOffset - 1) * 100;
		const pixelOffset = (this.dragStartPosition !== undefined) ? this.dragOffset : 0;

		if (initTransition) {
			// immediately trigger a rerender to transition to the center pane
			Ember.run.later(this, () => {
				this.setProperties({
					slideOffset: 0,
					dragStartPosition: undefined
				});
			}, 0);
		}

		return htmlSafe(
			`transform: translate(calc(${fullOffset}% + ${pixelOffset}px));` +
			// disable transition while user is interacting
			(initTransition || userIsInteracting ? 'transition: none;' : '')
		);
	}),

	actions: {
		slideToPrevious() {
			const currentIndex = this.get('currentIndex');

			if (this.cycle || currentIndex > 0) {
				this.setProperties({
					selected: this.data[mod(currentIndex - 1, this.data.length)].id,
					slideOffset: -1,
					dragStartPosition: undefined
				});
			}
		},

		slideToNext() {
			const currentIndex = this.get('currentIndex');

			if (this.cycle || currentIndex < this.data.length - 1) {
				this.setProperties({
					selected: this.data[mod(currentIndex + 1, this.data.length)].id,
					slideOffset: 1,
					dragStartPosition: undefined
				});
			}
		},
	},

	/*
	 * lifecycle
	 */

	init() {
		this._super(...arguments)
		this.oldAttrs = [];
	},

	didReceiveAttrs() {
		// idea from https://gist.github.com/buschtoens/708611e904dd515716080305405d86c9
		this._super(...arguments);

		const attrNames = ['selectedId', 'data'];
		const oldAttrs = this.get('oldAttrs');
		const newAttrs = this.getProperties(attrNames);

		if (oldAttrs['selectedId'] !== newAttrs['selectedId'] &&
			oldAttrs['data'] === newAttrs['data'])
		{
			const oldIndex = this.data.findIndex(content => content.id === oldAttrs['selectedId']);
			const newIndex = this.data.findIndex(content => content.id === newAttrs['selectedId']);

			const delta = newIndex - oldIndex;

			if (delta < 0) {
				this.set('slideOffset', -1);
			}
			else if (delta > 0) {
				this.set('slideOffset', 1);
			}
		}

		attrNames.forEach((name) => {
			oldAttrs[name] = newAttrs[name];
		});
	},

	/*
	 * event listeners
	 */

	touchStart(e) {
		this.startDrag(e.touches[0].clientX);
	},
	touchEnd(e) {
		this.endDrag(e.target);
	},
	touchMove(e) {
		if (this.dragStartPosition !== undefined) {
			this.updateDrag(e.touches[0].clientX)
		}
	},
	mouseDown(e) {
		this.startDrag(e.clientX);
	},
	mouseUp(e) {
		this.endDrag(e.target);
	},
	mouseLeave(e) {
		this.endDrag(e.target);
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

	endDrag(element) {
		if (this.dragStartPosition !== undefined) {
			const offset = this.get('dragOffset');
			const currentIndex = this.get('currentIndex');
			const sliderWidth = this.element.querySelector('.content-slider__slidewindow').clientWidth;

			if (Math.abs(offset) / sliderWidth > 0.3) {
				if (offset > 0) {
					if (this.cycle || currentIndex > 0) {
						this.setProperties({
							selected: this.data[mod(currentIndex - 1, this.data.length)].id,
							slideOffset: -1,
							// dragOffset: 0,
							dragStartPosition: -this.dragStartPosition
						});
					}
					else {
						// TODO
					}
				}
				else {
					if (this.cycle || currentIndex < this.data.length - 1) {
						this.setProperties({
							selected: this.data[mod(currentIndex + 1, this.data.length)].id,
							slideOffset: 1,
							// dragOffset: 0,
							dragStartPosition: -this.dragStartPosition
						});
					}
					else {
						// TODO
					}
				}
			}
			else {
				this.setProperties({
					dragStartPosition: undefined,
					dragOffset: 0,
					slideOffset: 0
				});
			}
		}
	},

	/**
	 * @argument element {HTMLElement}
	 * @argument newPos {number}
	*/
	updateDrag(newPos) {
		// might be != 0 on initializing transition to center
		if (this.slideOffset === 0) {
			this.set('dragOffset', newPos - this.dragStartPosition);
		}
	},
});

function mod(n, m) {
	return ((n % m) + m) % m;
}
