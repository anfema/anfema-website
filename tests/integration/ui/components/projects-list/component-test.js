import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const projects = [
	{
		file: 'bmw7series.json',
		meta: {
			client: 'BMW',
			color: '#0096DA',
			id: 'bmw7series',
			title: '7 Series Presenter App',
		},
		sorting: '1',
	},
	{
		file: 'knauf.json',
		meta: { client: 'Knauf / AMF', color: '#F97E33', id: 'knauf', title: 'Lookbook App' },
		sorting: '2',
	},
	{
		file: 'idnow.json',
		meta: {
			client: 'IDnow',
			color: '#F85720',
			id: 'idnow',
			title: 'Video Identification Web & App',
		},
		sorting: '3',
	},
	{
		file: 'takeda.json',
		meta: {
			client: 'Takeda',
			color: '#38ABBA',
			id: 'takeda',
			title: 'Voice to Patients Web & App',
		},
		sorting: '4',
	},
	{
		file: 'mystaffpilot.json',
		meta: {
			client: 'MyStaffPilot',
			color: '#006AC9',
			id: 'mystaffpilot',
			title: 'Plattform',
		},
		sorting: '5',
	},
	{
		file: 'tods.json',
		meta: { client: "TOD'S", color: '#342524', id: 'tods', title: 'Shoe Configurator App' },
		sorting: '6',
	},
	{
		file: 'pingonaut.json',
		meta: {
			client: 'Pingonaut',
			color: '#FF7F27',
			id: 'pingonaut',
			title: 'Kidswatch Web & App',
		},
		sorting: '7',
	},
	{
		file: 'ferchau.json',
		meta: {
			client: 'Ferchau',
			color: '#EA2E3A',
			id: 'ferchau',
			title: 'Augmented Reality App',
		},
		sorting: '8',
	},
];

module('Integration | Component | projects-list', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		this.set('projects', projects);

		await render(hbs`{{projects-list projects=projects}}`);

		assert.dom('.projects-list').exists();
		assert.dom('.projects-list-item:nth-child(8)').exists();
	});
});
