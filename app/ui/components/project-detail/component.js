import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
	headData: service(),

	backgroundColor: null,

	headStyle: computed('backgroundColor', function() {
		const backgroundColor = this.get('backgroundColor');

		if (!backgroundColor) {
			return null;
		}

		return `
			.page-overlay-shade {
				background-color: ${backgroundColor};
			}
		`;
	}),

	didInsertElement() {
		this.get('headData').addInlineStyle(this.get('headStyle'));
	},

	willDestroyElement() {
		this.get('headData').removeInlineStyle(this.get('headStyle'));
	},
});
