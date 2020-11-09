import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
	intl: service(),

	createMailToLinkWithContent(email, subject, body) {
		const subjectEncoded = encodeURIComponent(subject).trim();
		const bodyEncoded = encodeURIComponent(body).trim();

		return `mailto:${email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
	},

	mailtoLink: computed('data', 'meta', function() {
		const data = this.get('data');
		const meta = this.get('meta');
		const email = this.intl.t('component.page-footer.email.value');
		const subject = `${data.subject} ${meta.client} ${meta.title}`;
		const body = data.body.replace('{{projectInfo}}', `${meta.client} ${meta.title}`);

		console.log(data.body.partTwo);

		return this.createMailToLinkWithContent(email, subject, body);
	}),
});
