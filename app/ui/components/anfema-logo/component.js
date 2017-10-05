import Component from '@ember/component';
import { AnfemaLogo, StepDirection } from './logo';

export default Component.extend({
	classNames: ['anfema-logo'],
	tagName: 'canvas',

	step: 0,
	options: undefined,

	_logo: undefined,

	init() {
		this._super(...arguments);
		this.onResize = () => {
			this._logo.updateCanvas();
		};
	},

	didReceiveAttrs() {
		if (this._logo) {
			this._logo.startToStep(this.get('step'), StepDirection.Shortest);
		}
	},

	didInsertElement() {
		this._logo = new AnfemaLogo(this.get('element'), this.options).reset(this.step);

		// TODO use ResizeObserver when they are available
		window.addEventListener('resize', this.onResize);
	},

	willDestroyElement() {
		this._logo.dispose();
		window.removeEventListener('resize', this.onResize);
	},
});
