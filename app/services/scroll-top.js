import Service from '@ember/service';

export default Service.extend({
	scrollToTop() {
		if (window && window.scrollTo) {
			window.scrollTo(0, 0);
		}
	},
});
