import Controller from '@ember/controller';

export default Controller.extend({
	queryParams: ['service', 'team'],

	service: null,
	team: null,

	contentText1: null,
	contentText2: null,
	contentText3: null,
	services: null,
	teams: null,
});
