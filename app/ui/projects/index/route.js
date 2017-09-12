import Route from '@ember/routing/route';

export default Route.extend({
	model() {
		return {
			projects: [
				{
					id: 'bmw7series',
					client: 'BMW',
					title: '7 Series Presenter App',
					color: '#F00',
				}, {
					id: 'knauf',
					client: 'Knauf AMF',
					title: 'Lookbook App',
					color: '#F00',
				},
				{
					id: 'idnow',
					client: 'IDnow',
					title: 'Video Identification Web & App',
					color: '#F00',
				},
				{
					id: 'takeda',
					client: 'Takeda',
					title: 'Voice to Patients Web & App',
					color: '#F00',
				},
				{
					id: 'mystaffpilot',
					client: 'MyStaffPilot',
					title: 'Plattform',
					color: '#F00',
				},
				{
					id: 'tods',
					client: 'TOD\'S',
					title: 'Shoe Configurator App',
					color: '#F00',
				},
				{
					id: 'pingonaut',
					client: 'Pingonaut',
					title: 'Kidswatch Web & App',
					color: '#F00',
				},
				{
					id: 'ferchau',
					client: 'Ferchau',
					title: 'Augmented Reality App',
					color: '#F00',
				},
			],
		};
	},
});
