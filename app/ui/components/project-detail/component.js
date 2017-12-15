import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default Component.extend({
	headData: service(),

	data: null,

	color: alias('data.meta.color'),

	headStyle: computed('color', function() {
		const color = this.get('color');

		if (!color) {
			return null;
		}

		return `
			.page-overlay-shade {
				background-color: ${color};
			}

			.page-overlay .page-menu:before {
				box-shadow: 0 0 2rem 3rem ${color};
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
