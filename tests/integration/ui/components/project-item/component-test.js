import { assert, expect } from 'chai';
import { it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | project item', function() {
	setupComponentTest('project-item', {
		integration: true,
	});

	beforeEach(function() {
		this.set('project', {
			id: 'bmw7series',
			client: 'BMW',
			title: '7 Series Presenter App',
			color: '#F00',
		});

		this.render(hbs`
			{{#project-item 'projects.details' project.id project=project data-test-project-item=true}}
			{{/project-item}}
		`);

		this.container.lookup('service:intl').setLocale('de');
	});

	it('renders', async function() {
		expect(find('[data-test-project-item]')).to.exist;
		assert.equal(await find('[data-test-project-item-client]').innerText, this.get('project').client);
		assert.equal(await find('[data-test-project-item-title]').innerText, this.get('project').title);
		assert.equal(await find('[data-test-project-item-color]').innerText, this.get('project').color);
	});

	// TODO change block style of component!
});
