import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | project-cover', function(hooks) {
	setupRenderingTest(hooks);
	setupIntl(hooks);

	test('it renders', async function(assert) {
		this.set('data', {
			img: 'test.png',
			title: 'BMW 7 Series Presenter App',
		});

		await render(hbs`{{project-cover data=data}}`);

		assert.dom('.project-cover').exists();
	});
});
