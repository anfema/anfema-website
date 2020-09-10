import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
	// data: null,

	classNameBindings: [
		'useAlternateColor:project-text-right--alt',
		'assignmentText:project-text-right--assignment',
	],

	useAlternateColor: alias('data.useAlternateColor'),
	assignmentText: alias('data.assignmentText'),
});
