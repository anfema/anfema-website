import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	classNames: ['service-content'],

	data: undefined,
	selectedId: undefined,

	logoStep: computed('data', 'selectedId', function() {
		const currentId = this.get('selectedId');
		const currentService = this.get('data').find(service => service.id === currentId);

		return currentService ? currentService.logoStep : 0;
	}),

	actions: {
		slideChanged(e) {
			// console.log("onChange", e);
			this.set('selectedId', e);
		}
	}
});
