import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | content-slider', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		this.set('data', [
			{
				id: 'concept',
				title: 'concept title',
				text: 'concept text',
				hidden: false,
			},
			{
				id: 'id2',
				title: 'title 2',
				text: 'text 2',
				hidden: false,
			},
			{
				id: 'id3',
				title: 'title 3',
				text: 'text 3',
				hidden: false,
			},
		]);

		await render(hbs`{{content-slider data=data}}`);

		assert.dom('.content-slider').exists();
	});
});
