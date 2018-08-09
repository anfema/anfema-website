import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | content-project-gallery', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		this.set('data', {
			defaults: {
				width: 584,
				height: 438,
			},
			images: ['test.png', 'test2.png', 'test3.png', 'test4.png'],
		});
		await render(hbs`{{content-project-gallery data=data}}`);

		assert.dom('.content-project-gallery').exists();
	});
});
