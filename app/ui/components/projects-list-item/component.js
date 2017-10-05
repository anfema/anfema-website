import LinkComponent from '@ember/routing/link-component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

const ProjectsListItem = LinkComponent.extend({
	fastboot: service(),
	headData: service(),

	classNameBindings: ['projectIdClass'],

	project: null,

	bodyHoverClass: computed('project.id', function() {
		return `hover-${this.get('project.id')}`;
	}),

	projectIdClass: computed('project.id', function() {
		return `${this.componentClassName}--${this.get('project.id')}`;
	}),

	headStyle: computed('project.{color,id}', function() {
		const color = this.get('project.color');
		const className = this.get('bodyHoverClass');
		const project = this.get('project.id');
		const bodyHoverClass = this.get('bodyHoverClass');

		return `
			.${bodyHoverClass} {
				background: linear-gradient(0, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), ${color};
			}

			.${this.componentClassName}--${project}:focus,
			.${this.componentClassName}--${project}:hover {
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
		this.set('params', ['', 'projects.detail', this.get('project.id')]);

		this._super(...arguments);

		this.setStyle();
	},

	willDestroyElement() {
		this.destroyStyle();
	},

	setStyle() {
		scheduleOnce('afterRender', () => {
			this.get('headData.projectsListItemStyles').addObject(this.get('headStyle'));
		});
	},

	destroyStyle() {
		scheduleOnce('afterRender', () => {
			this.get('headData.projectsListItemStyles').removeObject(this.get('headStyle'));
		});
	},
});

export default ProjectsListItem;
