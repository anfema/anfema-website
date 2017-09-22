import Component from '@ember/component';

export default Component.extend({
	tagName: 'section',
	classNames: ['content-quote'],

	quoteText: null,
	quoteSource: null,
	projectId: null,
	projectLinkLabel: null,
});
