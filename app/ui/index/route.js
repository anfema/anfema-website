import Route from '@ember/routing/route';
import PrefixMixin from 'anfema/mixins/prefix-mixin';

export default Route.extend(PrefixMixin, {
	prefix: null,

	model() {
		return {
			prefix: this.get('prefix'),
			services: [
				{
					id: 'concept',
					title: 'concept title',
					text: 'concept text',
				},
				{
					id: 'design',
					title: 'design title',
					text: 'design text',
				},
				{
					id: 'development',
					title: 'development title',
					text: 'development text',
				},
				{
					id: 'consulting',
					title: 'consulting title',
					text: 'consulting text',
				},
				{
					id: 'support',
					title: 'support title',
					text: 'support text',
				},
				{
					id: 'management',
					title: 'management title',
					text: 'management text',
				},
			],
			team: [
				{
					id: 'team1',
					title: '#1',
					text: 'team1 text',
				},
				{
					id: 'agile',
					title: '#2',
					text: 'agile text',
				},
				{
					id: 'team2',
					title: '#3',
					text: 'team2 text',
				},
				{
					id: 'team3',
					title: '#4',
					text: 'team3 text',
				},
			],
		};
	},

	setupController(controller, model) {
		this._super(...arguments);

		controller.set('service', model.services[0].id);
		controller.set('team', model.team[0].id);
	},
});
