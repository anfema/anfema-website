import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
	classNames: ['language-select'],
	router: service(),
});
