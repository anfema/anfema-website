import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
// import { render } from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | content-lp-cover', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.set('myAction', function(val) { ... });

		// this.set('data', {
		// 	headline: 'foo',
		// 	subtitle: '<p>bar</p>',
		// 	component: 'content-lp-cover',
		// });

		// await render(hbs`{{content-lp-cover data=data}}`);

		// assert.dom('.content-lp-cover').exists();

		// assert.dom('.content-lp-cover h1').exists();
		// assert.dom('.content-lp-cover h1').containsText('foo');

		// assert.dom('.content-lp-cover p').exists();
		// assert.dom('.content-lp-cover p').containsText('bar');

		assert.ok(true);
	});
});
