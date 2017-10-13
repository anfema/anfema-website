import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
	pageOverlay: service(),

	tagName: '',

	computedClassName: computed('pageOverlay.classNames.@each', function() {
		return this.get('pageOverlay.classNames').join(' ');
	}),
});
