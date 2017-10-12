import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
	shade: service(),

	didInsertElement() {
		this.get('shade').show();
	},

	willDestroyElement() {
		this.get('shade').hide();
	},
});
