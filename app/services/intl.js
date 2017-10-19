import IntlService from 'ember-intl/services/intl';
import { inject as service } from '@ember/service';

export default IntlService.extend({
	fastboot: service(),

	setLocale(locale) {
		this._super(...arguments);

		if (!this.get('fastboot.isFastBoot')) {
			document.documentElement.lang = locale;
		}
	},
});
