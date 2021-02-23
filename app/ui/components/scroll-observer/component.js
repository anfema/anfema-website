import Component from '@ember/component';
import { throttle } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Component.extend({
	scrollPosition: service(),

	scrollEventListener: null,

	willInsertElement() {
		this.scrollPosition.updateScrollPosition(window);
	},

	didInsertElement() {
		if (window && this.scrollEventListener === null) {
			this.set('scrollEventListener', () =>
				throttle(this, () => this.scrollPosition.updateScrollPosition(window), 200)
			);
			//window.addEventListener('scroll', this.scrollEventListener);

			window.addEventListener(
				'scroll',
				() => {
					document.body.style.setProperty(
						'--scroll',
						window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
					);
				},
				false
			);
		}
	},

	willRemoveElement() {
		if (window) {
			window.addEventListener('scroll', null);
		}
	},
});
