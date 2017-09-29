import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	classNames: ['service-content'],

	data: undefined,

	selectedId: undefined,

	slideDirection: 0,

	selected: computed('selectedId', function() {
		return this.selectedId
			? this.data.find(service => service.id === this.selectedId)
			: this.data[0];
	}),

	logoStep: computed('data', 'selectedId', function() {
		const currentId = this.get('selectedId');
		const currentService = this.get('data').find(service => service.id === currentId);

		return currentService ? currentService.logoStep : 0;
	}),

	actions: {
		previousSlide(slide) {
			this.setProperties({
				selectedId: slide.id,
				slideDirection: -1
			});
		},

		nextSlide(slide) {
			this.setProperties({
				selectedId: slide.id,
				slideDirection: 1
			});
		}
	}
});
