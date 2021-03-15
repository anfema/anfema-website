import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

const projectData = {
	client: 'Client',
	color: '#EA2E3A',
	id: 'client',
	title: 'Title',
	img: 'test.png',
};

module('Integration | Component | projects-list-item', function(hooks) {
	setupRenderingTest(hooks);
	test('it renders', async function(assert) {
		// TODO: add back if images in tests are working
		this.set('projectData', projectData);
		await render(hbs`{{projects-list-item project=projectData}}`);

		assert.dom('.projects-list-item').exists();
	});
});
