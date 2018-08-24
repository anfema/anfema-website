import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | project-cover', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		this.set('data', {
			img: 'test.png',
			title: 'BMW 7 Series Presenter App',
		});

		await render(hbs`{{project-cover data=data}}`);

		assert.dom('.project-cover').exists();
	});
});
