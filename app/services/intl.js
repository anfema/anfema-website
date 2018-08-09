import IntlService from 'ember-intl/services/intl';
import { inject as service } from '@ember/service';
import getDOM from '../utils/get-dom';

export default IntlService.extend({
	fastboot: service(),

	setLocale(locale) {
		this._super(...arguments);

		const dom = getDOM(this);

		if (dom) {
			return;
		}

		dom.documentElement.setAttribute('lang', locale);
	},
});
