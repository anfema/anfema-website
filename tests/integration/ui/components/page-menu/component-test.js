import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | page-menu', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.set('myAction', function(val) { ... });

		await render(hbs`{{page-menu}}`);

		assert.dom('.page-menu').exists();
		assert.dom('.page-menu__logo').exists();

		await render(hbs`{{#page-menu}}<ul></ul>{{/page-menu}}`);

		assert.dom('.page-menu__nav ul').exists();
	});
});
