import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | content quote', function() {
	setupComponentTest('content-quote', {
		integration: true,
	});

	const data = {
		text: 'text',
		source: 'source',
		projectId: 'projectId',
		projectLinkLabel: 'projectLinkLabel',
	};

	const dataWithNoLink = {
		text: 'text',
		source: 'source',
	};

	const dataWithNoCustomLinkLabel = {
		text: 'text',
		source: 'source',
		projectId: 'projectId',
	};

	beforeEach(function() {
		this.set('data', data);
		this.set('dataWithNoLink', dataWithNoLink);
		this.set('dataWithNoCustomLinkLabel', dataWithNoCustomLinkLabel);

		this.container.lookup('service:intl').setLocale('de');
	});

	it('Renders quote content', async function() {
		await this.render(hbs`{{content-quote data=data}}`);

		expect(find('.content-quote__text')).to.exist;
		expect(find('.content-quote__text').innerText.trim()).to.equal(data.text);
	});

	it('Renders quote-source', async function() {
		await this.render(hbs`{{content-quote data=data}}`);

		expect(find('.content-quote__source')).to.exist;
		expect(find('.content-quote__source').innerText.trim()).to.equal(data.source);
	});

	it('Renders no project link if no id given', async function() {
		await this.render(hbs`{{content-quote data=dataWithNoLink}}`);

		expect(find('.content-quote__project')).to.not.exist;
	});

	it('Renders project link with custom text', async function() {
		await this.render(hbs`{{content-quote data=data}}`);

		expect(find('.content-quote__project')).to.exist;
		expect(find('.content-quote__project').innerText.trim()).to.equal(data.projectLinkLabel);
	});

	it('Renders project link with default text', async function() {
		await this.render(hbs`{{content-quote data=dataWithNoCustomLinkLabel}}`);

		expect(find('.content-quote__project')).to.exist;
		expect(find('.content-quote__project').innerText.trim()).to.match(
			/component\.contet\-quote\.action\.showProject/
		);
	});
});
