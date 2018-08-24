import Service from '@ember/service';

function easeInOutQuad(t, b, c, d) {
	t /= d / 2;

	if (t < 1) {
		return (c / 2) * t * t + b;
	}

	t -= 1;

	return (-c / 2) * (t * (t - 2) - 1) + b;
}

export default Service.extend({
	scrollToTop() {
		if (window && window.scrollTo) {
			window.scrollTo(0, 0);
		}
	},

	scrollToAnimated(to, callback, duration = 500) {
		if (!window.requestAnimationFrame) {
			window.scrollTo(0, to);
		}

		const start = window.scrollY;
		const increment = 20;
		let currentTime = 0;

		function animateScroll() {
			currentTime += increment;

			window.scrollTo(0, easeInOutQuad(currentTime, start, to - start, duration));

			if (currentTime < duration) {
				requestAnimationFrame(animateScroll);
			} else if (callback && typeof callback === 'function') {
				callback();
			}
		}

		animateScroll();
	},
});
