import { assert, expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | services slider', function () {
	setupComponentTest('services-slider', {
		integration: true,
	});

	beforeEach(function () {
		this.set('services', {
			concept: {
				title: 'concept title',
				text: 'concept text',
			},
		});
	});

	it('renders', function () {
		this.render(hbs`
			{{services-slider services=services service='' data-test-service=true}}
		`);
		expect(find('[data-test-service]')).to.exist;
		expect(find('[data-test-service-title]')).to.exist;
		expect(find('[data-test-service-text]')).to.exist;
	});

	it('renders standard text', async function () {
		this.render(hbs`
			{{services-slider services=services service='' data-test-service=true}}
		`);
		assert.equal(await find('[data-test-service-title]').innerText, 'standard title');
		assert.equal(await find('[data-test-service-text]').innerText, 'standard text');
	});

	it('renders service text', async function () {
		this.render(hbs`
			{{services-slider services=services service='concept' data-test-service=true}}
		`);
		assert.equal(await find('[data-test-service-title]').innerText, 'concept title');
		assert.equal(await find('[data-test-service-text]').innerText, 'concept text');
	});
});
