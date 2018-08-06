import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | content-project-triptych', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		this.set('data', {
			component: 'content-project-triptych',
			defaults: {
				width: 800,
				height: 600,
			},
			images: [
				'test.png',
				'test2.png',
				{
					url: 'test3.png',
					width: 508,
					height: 380,
				},
			],
			useAlternateColor: true,
		});

		await render(hbs`{{content-project-triptych data=data}}`);

		assert.dom('.content-project-triptych').exists();
	});
});
