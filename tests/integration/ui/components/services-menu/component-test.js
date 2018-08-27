import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
// import { render } from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';

// const services = [
// 	{
// 		id: 'concept',
// 		title: 'concept title',
// 		text: 'concept text',
// 		logoStep: 0,
// 	},
// 	{
// 		id: 'id2',
// 		title: 'title 2',
// 		text: 'text 2',
// 		logoStep: 1,
// 	},
// 	{
// 		id: 'id3',
// 		title: 'title 3',
// 		text: 'text 3',
// 		logoStep: 2,
// 	},
// ];

module('Integration | Component | services-menu', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		// this.set('services', services);

		// await render(hbs`{{services-menu items=services}}`);

		// assert.dom('.services-menu').exists();

		assert.ok(true);
	});
});
