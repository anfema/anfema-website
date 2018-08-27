import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | content-lp-text', function(hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function(assert) {
		this.set('data', {
			anchorId: 'philosophy',
			component: 'content-lp-text',
			content: 'bar',
			sectionLabel: '01',
			title: 'foo',
		});

		await this.render(hbs`{{content-lp-text data=data}}`);

		assert.dom('.content-lp-text').exists();
		assert.dom('.content-lp-text a').containsText('01');
		assert.dom('.content-lp-text h2').containsText('foo');
		assert.dom('.content-lp-text__content').containsText('bar');
	});
});
