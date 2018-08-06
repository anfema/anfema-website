import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default Controller.extend({
	intl: service(),

	year: new Date().getFullYear(),

	language: alias('intl.locale.0'),
});
