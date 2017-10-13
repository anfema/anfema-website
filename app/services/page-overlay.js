import Service from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
	classNames: A(),

	addClass(className) {
		this.get('classNames').addObject(className);
	},

	removeClass(className) {
		this.get('classNames').removeObject(className);
	},
});
