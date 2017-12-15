import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	classNames: ['services-content'],

	data: undefined,
	selectedId: undefined,

	_slideDirection: 0,
	_selected: computed('data.@each', 'selectedId', function() {
		return this.selectedId
			? this.data.find(service => service.id === this.selectedId)
			: this.data[0];
	}),
	_logoStep: computed('data.@each', 'selectedId', function() {
		const currentService = this.get('data').find(service => service.id === this.selectedId);

		return currentService ? currentService.logoStep : 0;
	}),

	_oldSelectedId: undefined,

	actions: {
		previousSlide(slide) {
			this.setProperties({
				selectedId: slide.id,
				_slideDirection: -1,
			});
		},

		nextSlide(slide) {
			this.setProperties({
				selectedId: slide.id,
				_slideDirection: 1,
			});
		},

		itemSelected(slide) {
			const oldIndex = this.data.findIndex(item => item === this.get('_selected'));
			const newIndex = this.data.findIndex(item => item === slide);
			const direction = oldIndex < newIndex ? 1 : -1;

			this.setProperties({
				selectedId: slide.id,
				_slideDirection: direction,
			});
		},
	},

	didReceiveAttrs() {
		this._super(...arguments);
		this._oldSelectedId = this.selectedId;
	},
});
