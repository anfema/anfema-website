import Service from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
	inlineStyles: A(),

	addInlineStyle(style) {
		if (typeof style !== 'string' || style === '') {
			return;
		}

		this.inlineStyles.addObject(style);
	},

	removeInlineStyle(style) {
		this.inlineStyles.removeObject(style);
	},
});
