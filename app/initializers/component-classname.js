import Component from '@ember/component';

function initialize(/* application */) {
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

const initializer = {
	name: 'component-classname',
	initialize,
};

export { initialize };

export default initializer;
