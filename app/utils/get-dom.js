import { getOwner } from '@ember/application';

// adjusted from https://github.com/yapplabs/ember-wormhole/blob/0.5.4/addon/utils/dom.js#L45-L63
//
// Private Ember API usage. Get the dom implementation used by the current
// renderer, be it native browser DOM or Fastboot SimpleDOM
export default function getDOM(context) {
	let { renderer } = context;

	if (!renderer || !renderer._dom) {
		// pre glimmer2
		const container = getOwner ? getOwner(context) : context.container;
		const documentService = container.lookup('service:-document');

		if (documentService) {
			return documentService;
		}

		renderer = container.lookup('renderer:-dom');
	}

	if (renderer._dom && renderer._dom.document) {
		// pre Ember 2.6
		return renderer._dom.document;
	}

	return null;
}
