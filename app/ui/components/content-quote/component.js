import Component from '@ember/component';

export default Component.extend({
	tagName: 'section',
	classNames: ['content-quote'],

	quote_text: null,
	quote_source: null,
	project_id: null,
	project_link_label: null,
});
