import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
	data: null,

	classNameBindings: ['useAlternateColor:project-text--alt'],

	useAlternateColor: alias('data.useAlternateColor'),
});
