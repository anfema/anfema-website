import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
	tagName: 'section',
	data: null,

	win: service(),

	actions: {
		scrollDown() {
			this.get('win').scrollToAnimated(window.innerHeight * 0.9);
		},
	},
});
