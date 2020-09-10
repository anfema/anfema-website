import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
	// data: null,

	classNameBindings: [
		'useAlternateColor:project-text-left--alt',
		'assignmentText:project-text-left--assignment',
	],

	useAlternateColor: alias('data.useAlternateColor'),
	assignmentText: alias('data.assignmentText'),
});
