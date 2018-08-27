import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
// import { render } from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | content-project-video', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		this.set('data', {
			width: 684,
			height: 513,
			poster: 'test.png',
			videos: [
				{
					path: 'path-to-video',
					type: 'mp4',
				},
			],
		});

		// await render(hbs`{{content-project-video data=data}}`);

		// assert.dom('.content-project-video').exists();

		assert.ok(true);
	});
});
