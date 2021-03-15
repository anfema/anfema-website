import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

const projects = [
	{
		file: 'bmw7series.json',
		meta: {
			client: 'BMW',
			color: '#0096DA',
			id: 'bmw7series',
			title: '7 Series Presenter App',
			img: 'test.png',
		},
		sorting: '1',
	},
	{
		file: 'knauf.json',
		meta: {
			client: 'Knauf / AMF',
			color: '#F97E33',
			id: 'knauf',
			title: 'Lookbook App',
			img: 'test.png',
		},
		sorting: '2',
	},
	{
		file: 'idnow.json',
		meta: {
			client: 'IDnow',
			color: '#F85720',
			id: 'idnow',
			title: 'Video Identification Web & App',
			img: 'test.png',
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
			img: 'test.png',
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
			img: 'test.png',
		},
		sorting: '5',
	},
	{
		file: 'tods.json',
		meta: {
			client: "TOD'S",
			color: '#342524',
			id: 'tods',
			title: 'Shoe Configurator App',
			img: 'test.png',
		},
		sorting: '6',
	},
	{
		file: 'pingonaut.json',
		meta: {
			client: 'Pingonaut',
			color: '#FF7F27',
			id: 'pingonaut',
			title: 'Kidswatch Web & App',
			img: 'test.png',
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
			img: 'test.png',
		},
		sorting: '8',
	},
];

module('Integration | Component | projects-list', function(hooks) {
	setupRenderingTest(hooks);
	setupIntl(hooks);

	test('it renders', async function(assert) {
		this.set('projects', projects);

		await render(hbs`{{projects-list projects=projects}}`);

		assert.dom('.projects-list').exists();
		assert.dom('.projects-list-item:nth-child(8)').exists();
	});
});
