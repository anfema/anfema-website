import Component from '@ember/component';

export function initialize(application) {
	Component.reopen({
		init() {
			this._super(...arguments);

			this.classNames = [this.toString().split(':')[1]];
		},
	});
}

export default {
	name: 'component-classname',
	initialize,
};
