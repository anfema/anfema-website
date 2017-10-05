import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
	fastboot: service(),
	headData: service(),

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

	willDestroyElement() {
		this.destroyStyle();
	},

	setStyle() {
		this.get('headData.projectsListItemStyles').addObject(this.get('headStyle'));
	},

	destroyStyle() {
		this.get('headData.projectsListItemStyles').removeObject(this.get('headStyle'));
	},
});
