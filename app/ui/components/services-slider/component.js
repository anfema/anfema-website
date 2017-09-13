import Component from '@ember/component';

export default Component.extend({
	selected: null,
	services: null,
	service: null,

	didReceiveAttrs() {
		if (!this.get('service')) {
			this.set('selected', {
				title: 'standard title',
				text: 'standard text',
			});
		} else {
			this.set('selected', this.get(`services.${this.get('service')}`));
		}
	},

	actions: {
		changeService(service) {
			this.set('service', service);
		},
	},
});
