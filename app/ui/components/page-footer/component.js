import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
	intl: service(),

	classNames: ['h-card'],

	year: new Date().getFullYear(),

	createMailToLinkWithContent(email, subject, body) {
		const subjectEncoded = encodeURIComponent(subject).trim();
		const bodyEncoded = encodeURIComponent(body).trim();

		return `mailto:${email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
	},

	mailtoLink: computed('data', 'meta', function() {
		const email = this.intl.t('component.page-footer.email.value');
		const subject = this.intl.t('component.page-footer.email.subject');
		const body = this.intl.t('component.page-footer.email.body');

		return this.createMailToLinkWithContent(email, subject, body);
	}),
});
