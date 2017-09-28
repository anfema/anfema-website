import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	classNameBindings: [':content-folder-item', 'isActive:content-folder-item--active'],

	content: null,
	selected: null,

	isActive: computed('content.id', 'selected', function() {
		return this.get('content.id') === this.get('selected');
	}),

	didInsertElement() {
		//console.log('inserted content-folder-item');

		function collapseContent(element) {
			// get the height of the element's inner content, regardless of its actual size
			var contentHeight = element.scrollHeight;

			// temporarily disable all css transitions
			var elementTransition = element.style.transition;
			element.style.transition = '';

			// on the next frame (as soon as the previous style change has taken effect),
			// explicitly set the element's height to its current pixel height, so we
			// aren't transitioning out of 'auto'
			requestAnimationFrame(function() {
				element.style.height = contentHeight + 'px';
				element.style.transition = elementTransition;

				// on the next frame (as soon as the previous style change has taken effect),
				// have the element transition to height: 0
				requestAnimationFrame(function() {
					element.style.height = 0 + 'px';
				});
			});

			// mark the content as "currently collapsed"
			element.setAttribute('data-collapsed', 'true');
		}

		function expandContent(element) {
			// get the height of the element's inner content, regardless of its actual size
			var contentHeight = element.scrollHeight;

			// have the element transition to the height of its inner content
			element.style.height = contentHeight + 'px';

			// when the next css transition finishes (which should be the one we just triggered)
			var rmListener = function(e) {
				element.removeEventListener('transitioned', rmListener, false);
			}

			element.addEventListener('transitionend', rmListener, function(e) {
				// remove this event listener so it only gets triggered once
				// element.removeEventListener('transitionend', arguments.callee);

				// remove "height" from the element's inline styles, so it can return to its initial value
				element.style.height = null;
			});

			/* var foo = function(e) {
				"use strict";
				console.log(e);
				document.removeEventListener('keyup', foo, false);
			}

			document.addEventListener('keyup', foo); */

			// mark the content as "currently not collapsed"
			element.setAttribute('data-collapsed', 'false');
		}

		document.querySelector('.content-folder__navigation-link').addEventListener('click', function(e) {
			var content = document.querySelector('.content-folder__content');
			var isCollapsed = content.getAttribute('data-collapsed') === 'true';

			if(isCollapsed) {
				expandContent(content)
				content.setAttribute('data-collapsed', 'false')
			} else {
				collapseContent(content)
			}
		});
	},
});
