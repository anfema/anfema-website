import LinkComponent from '@ember/routing/link-component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

const ProjectsListItem = LinkComponent.extend({
	fastboot: service(),
	headData: service(),
	pageOverlay: service(),

	classNameBindings: ['projectIdClass'],

	project: null,

	hoverClass: computed('project.id', function() {
		return `page-overlay-shade--${this.get('project.id')}`;
	}),

	projectIdClass: computed('project.id', function() {
		return `${this.componentClassName}--${this.get('project.id')}`;
	}),

	headStyle: computed('project.{color,id}', function() {
		const color = this.get('project.color');
		const project = this.get('project.id');
		const hoverClass = this.get('hoverClass');

		return `
			.${hoverClass} {
				background-color: ${color};
			}

			.${hoverClass} ~ .page-overlay .page-menu:before {
				box-shadow: 0 0 2rem 3rem ${color};
			}

			.${this.componentClassName}--${project}:focus,
			.${this.componentClassName}--${project}:hover {
				background-color: ${color};
			}
		`;
	}),

	mouseEnter() {
		this.get('pageOverlay').addClass(this.get('hoverClass'));
	},

	mouseLeave() {
		this.get('pageOverlay').removeClass(this.get('hoverClass'));
	},

	didReceiveAttrs() {
		this.set('params', ['', 'projects.detail', this.get('project.id')]);

		this._super(...arguments);

		this.get('headData').addInlineStyle(this.get('headStyle'));
	},

	willDestroyElement() {
		this.get('headData').removeInlineStyle(this.get('headStyle'));
	},
});

export default ProjectsListItem;
