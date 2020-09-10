import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | project-text-left', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		this.set('data', {
			content: 'foo',
		});

		await render(hbs`{{project-text data=data}}`);

		assert.dom('.project-text-left').exists();
		assert.dom('.project-text-left').containsText('foo');
	});
});
