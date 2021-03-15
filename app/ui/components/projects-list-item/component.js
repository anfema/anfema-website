import LinkComponent from '@ember/routing/link-component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

const ProjectsListItem = LinkComponent.extend({
	fastboot: service(),

	classNameBindings: ['projectIdClass', 'bgColor'],

	project: null,

	projectIdClass: computed('project.id', function() {
		return `${this.componentClassName}--${this.get('project.id')}`;
	}),

	bgColor: computed('project.id', function() {
		return `bgColor--${this.get('project.id')}`;
	}),

	didReceiveAttrs() {
		this.set('params', ['', 'projects.detail', this.get('project.id')]);

		this._super(...arguments);
	},
});

export default ProjectsListItem;
