// Adapted from
// https://github.com/yapplabs/ember-modal-dialog/blob/master/addon/initializers/add-modals-container.js
const hasDOM = typeof document !== 'undefined';

function appendContainerElement(rootElementementId, id) {
	if (!hasDOM) {
		return;
	}

	if (document.getElementById(id)) {
		return;
	}

	const rootElement = document.querySelector(rootElementementId);
	const containerElement = document.createElement('div');

	containerElement.id = id;
	rootElement.appendChild(containerElement);
}

function initialize(application) {
	const destinationElementId = 'page-overlay';

	application.register('config:page-overlay-container-id', destinationElementId, { instantiate: false });

	application.inject('service:page-overlay', 'destinationElementId', 'config:page-overlay-container-id');

	appendContainerElement(application.rootElement, destinationElementId);
}

export default {
	name: 'page-overlay',
	initialize,
};
