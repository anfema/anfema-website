import Service from 'static-content/services/static-content';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
	intl: service(),

	prefix: computed('intl.locale.0', function() {
		return `/contents/${this.get('intl.locale.0')}`;
	}),
});
