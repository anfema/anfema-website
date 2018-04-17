import Service from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
	classNames: A(),

	addClass(className) {
		this.classNames.addObject(className);
	},

	removeClass(className) {
		this.classNames.removeObject(className);
	},
});
