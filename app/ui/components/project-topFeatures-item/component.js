import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	isActive: computed('data.id', 'selected', function() {
		return this.get('data.id') === this.selected;
	}),
});
