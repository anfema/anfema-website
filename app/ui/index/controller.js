import Controller from '@ember/controller';

export default Controller.extend({
	queryParams: ['service', 'team'],
	service: null,
	team: null,
});
