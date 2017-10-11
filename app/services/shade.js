import Service from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

export default Service.extend({
	showShade: false,

	show() {
		this.set('showShade', true);
	},

	hide() {
		scheduleOnce('afterRender', () => {
			this.set('showShade', false);
		});
	},
});
