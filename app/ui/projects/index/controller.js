import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	win: service(),

	actions: {
		scrollToTop() {
			this.win.scrollToAnimated(0, 0);
		},
	},
});
