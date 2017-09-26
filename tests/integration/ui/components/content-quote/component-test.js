import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content quote', function() {
	setupComponentTest('content-quote', {
		integration: true,
	});

	it('Renders quote', async function() {
		await this.render(hbs`{{content-quote}}`);

		expect(find('.quote-text')).to.exist;
	});

	it('Renders quote-source', async function() {
		await this.render(hbs`{{content-quote}}`);

		expect(find('.quote-source')).to.exist;
	});

	it('Renders project', async function() {
		await this.render(hbs`{{content-quote}}`);

		expect(find('.project')).to.exist;
	});

	it('Renders projectLinkLabel', async function() {
		await this.render(hbs`{{content-quote}}`);

		expect(find('.projectLinkLabel')).to.exist;
	});
});
