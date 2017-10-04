import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | projects list', function() {
	setupComponentTest('projects-list', {
		integration: true,
	});

	const projects = [
		{
			file: 'bmw7series.json',
			meta: { client: 'BMW', color: '#0096DA', id: 'bmw7series', title: '7 Series Presenter App' },
			sorting: '1',
		},
		{
			file: 'knauf.json',
			meta: { client: 'Knauf / AMF', color: '#F97E33', id: 'knauf', title: 'Lookbook App' },
			sorting: '2',
		},
		{
			file: 'idnow.json',
			meta: { client: 'IDnow', color: '#F85720', id: 'idnow', title: 'Video Identification Web & App' },
			sorting: '3',
		},
		{
			file: 'takeda.json',
			meta: { client: 'Takeda', color: '#38ABBA', id: 'takeda', title: 'Voice to Patients Web & App' },
			sorting: '4',
		},
		{
			file: 'mystaffpilot.json',
			meta: { client: 'MyStaffPilot', color: '#006AC9', id: 'mystaffpilot', title: 'Plattform' },
			sorting: '5',
		},
		{
			file: 'tods.json',
			meta: { client: "TOD'S", color: '#342524', id: 'tods', title: 'Shoe Configurator App' },
			sorting: '6',
		},
		{
			file: 'pingonaut.json',
			meta: { client: 'Pingonaut', color: '#FF7F27', id: 'pingonaut', title: 'Kidswatch Web & App' },
			sorting: '7',
		},
		{
			file: 'ferchau.json',
			meta: { client: 'Ferchau', color: '#EA2E3A', id: 'ferchau', title: 'Augmented Reality App' },
			sorting: '8',
		},
	];

	it('renders', function() {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#projects-list}}
		// 		template content
		// 	{{/projects-list}}
		// `);

		this.set('projects', projects);
		this.render(hbs`{{projects-list projects=projects}}`);

		expect(find('.projects-list')).to.exist;
		expect(findAll('.projects-list-item')).to.have.lengthOf(projects.length);
	});
});
