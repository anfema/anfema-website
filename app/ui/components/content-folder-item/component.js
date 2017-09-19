import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	classNameBindings: [':content-folder-item', 'isActive:content-folder-item--active'],

	content: null,
	selected: null,

	isActive: computed('content.id', 'selected', function() {
		return this.get('content.id') === this.get('selected');
	}),
});
