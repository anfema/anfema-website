import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
	fastboot: service(),

	project: null,

	bodyHoverClass: computed('project.id', function() {
		return `hover-${this.get('project.id')}`;
	}),

	headStyle: computed('project.{color,id}', function() {
		const color = this.get('project.color');
		const className = this.get('bodyHoverClass');
		const project = this.get('project.id');
		const bodyHoverClass = this.get('bodyHoverClass');

		return `
			.${bodyHoverClass} {
				background-color: ${color};
			}

			.project-list-item--${project}:focus,
			.project-list-item--${project}:hover {
				background-color: ${color};
			}
		`;
	}),

	mouseEnter() {
		document.body.classList.add(this.get('bodyHoverClass'));
	},

	mouseLeave() {
		document.body.classList.remove(this.get('bodyHoverClass'));
	},

	didReceiveAttrs() {
		this.setStyle();
	},

	didInsertElement() {
		if (!this.get('fastboot.isFastBoot')) {
			this.createStyle();
			this.setStyle();
		}
	},

	willDestroyElement() {
		if (!this.get('fastboot.isFastBoot')) {
			this.destroyStyle();
		}
	},

	createStyle() {
		const styleElement = document.createElement('style');

		styleElement.id = this.styleId();

		document.head.appendChild(styleElement);

		this._styleElement = styleElement;
	},

	destroyStyle() {
		this._styleElement.parentNode.removeChild(this._styleElement);
	},

	styleId() {
		return `${this.elementId}-style`;
	},

	setStyle() {
		if (!this._styleElement) {
			return;
		}

		this._styleElement.innerHTML = this.get('headStyle');
	},
});
