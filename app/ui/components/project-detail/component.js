import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
	headData: service(),

	backgroundColor: null,

	headStyle: computed('backgroundColor', function() {
		const color = this.get('backgroundColor');

		if (!color) {
			return null;
		}

		return `
			.page-overlay-shade {
				background-color: ${color};
			}

			.page-overlay .page-menu__bar {
				box-shadow:
					0 2px 5px 0 rgba(49, 41, 51, 0.1),
					0 1px 2px 0 rgba(49, 41, 51, 0.17),
					0 5px 20px 0 rgba(49, 41, 51, 0.15),
					0 -2rem 1rem 1rem ${color};
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
