import Component from '@ember/component';
import scrollToAnimated from 'anfema/utils/scroll-to-animated';

export default Component.extend({
	tagName: 'section',

	data: null,

	actions: {
		scrollDown() {
			scrollToAnimated(window.innerHeight * 0.9);
		},
	},
});
