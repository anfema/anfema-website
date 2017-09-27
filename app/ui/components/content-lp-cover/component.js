import Component from '@ember/component';

function easeInOutQuad(t, b, c, d) {
	t /= d / 2;

	if (t < 1) {
		return c / 2 * t * t + b;
	}

	t -= 1;

	return -c / 2 * (t * (t - 2) - 1) + b;
}

function scrollToAnimated(to, callback, duration = 500) {
	if (!window.requestAnimationFrame) {
		window.scrollTo(0, to);
	}

	const start = window.scrollX;
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
}

export default Component.extend({
	classNames: ['content-lp-cover'],
	tagName: 'section',

	data: null,

	actions: {
		scrollDown() {
			scrollToAnimated(window.innerHeight * 0.9);
		},
	},
});
