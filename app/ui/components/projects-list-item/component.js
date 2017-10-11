import LinkComponent from '@ember/routing/link-component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

const ProjectsListItem = LinkComponent.extend({
	fastboot: service(),
	headData: service(),

	classNameBindings: ['projectIdClass'],

	project: null,

	hoverClass: computed('project.id', function() {
		return `shade--hover-${this.get('project.id')}`;
	}),

	projectIdClass: computed('project.id', function() {
		return `${this.componentClassName}--${this.get('project.id')}`;
	}),

	shadeElement: null,

	headStyle: computed('project.{color,id}', function() {
		const color = this.get('project.color');
		const className = this.get('hoverClass');
		const project = this.get('project.id');
		const hoverClass = this.get('hoverClass');

		return `
			.${hoverClass} {
				background-color: ${color};
			}

			.${this.componentClassName}--${project}:focus,
			.${this.componentClassName}--${project}:hover {
				background-color: ${color};
			}
		`;
	}),

	mouseEnter() {
		this.get('shadeElement').classList.add(this.get('hoverClass'));
	},

	mouseLeave() {
		this.get('shadeElement').classList.remove(this.get('hoverClass'));
	},

	didReceiveAttrs() {
		this.set('params', ['', 'projects.detail', this.get('project.id')]);

		this._super(...arguments);

		this.setStyle();
	},

	didInsertElement() {
		this.set('shadeElement', document.querySelector('.shade'));
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
