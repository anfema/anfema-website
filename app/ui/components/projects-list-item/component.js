import LinkComponent from '@ember/routing/link-component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

const ProjectsListItem = LinkComponent.extend({
	fastboot: service(),

	classNameBindings: ['projectIdClass'],

	project: null,

	hoverClass: computed('project.id', function() {
		return `page-overlay-shade--${this.get('project.id')}`;
	}),

	projectIdClass: computed('project.id', function() {
		return `${this.componentClassName}--${this.get('project.id')}`;
	}),

	didReceiveAttrs() {
		this.set('params', ['', 'projects.detail', this.get('project.id')]);

		this._super(...arguments);
	},
});

export default ProjectsListItem;
