import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
	scrollY: 0,

	// Fix height of header and footer
	headerHeight: 60,
	footerHeight: 217,

	// Dynamic height of body and window
	bodyHeight: null,
	windowHeight: null,

	scrollPositionTop: computed('scrollY', function() {
		return this.scrollY === 0;
	}),
	scrollPositionContent: computed('scrollY', function() {
		return this.scrollY > this.headerHeight;
	}),
	scrollPositionBottom: computed('scrollY', 'bodyHeight', 'windowHeight', function() {
		return this.scrollY + this.windowHeight === this.bodyHeight;
	}),
	scrollPositionFooter: computed('scrollY', 'bodyHeight', 'windowHeight', function() {
		return this.scrollY + this.windowHeight > this.bodyHeight - 202;
	}),

	updateScrollPosition(window) {
		if (window) {
			this.set('scrollY', window.scrollY);
			this.set('windowHeight', window.innerHeight);
			this.set('bodyHeight', window.document.body.scrollHeight);
		}
	},
});
