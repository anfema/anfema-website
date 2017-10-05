import Component from '@ember/component';

export function initialize(application) {
	Component.reopen({
		init() {
			this._super(...arguments);

			const componentClassName = this._debugContainerKey
				? this._debugContainerKey.split(':')[1]
				: this.toString().split(':')[1];

			this.classNames = [componentClassName];

			this.componentClassName = componentClassName;
		},
	});
}

export default {
	name: 'component-classname',
	initialize,
};
