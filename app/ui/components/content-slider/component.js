import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
	selected: null,
	content: null,
	param: null,

	didReceiveAttrs() {
		if (this.get('param')) {
			this.get('content').forEach((item) => {
				Ember.set(item, 'hidden', (item.id !== this.get('param')));
			});
		}
	},
});
