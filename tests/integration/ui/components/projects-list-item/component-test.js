import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';
import headData from 'anfema/services/head-data';

describe('Integration | Component | projects list item', function() {
	setupComponentTest('projects-list-item', {
		integration: true,
	});

	const project = {
		client: 'BMW',
		color: '#0096DA',
		id: 'bmw7series',
		title: '7 Series Presenter App',
	};

	beforeEach(function() {
		this.register('service:head-data', headData);
		this.inject.service('head-data', { as: 'headData' });
		this.set('project', project);
	});

	it('renders', function() {
		this.render(hbs`{{projects-list-item project=project}}`);

		expect(find('.projects-list-item'), 'list item not rendered').to.exist;

		expect(find('.projects-list-item__client'), 'No client rendered').to.exist;
		// expect(
		// 	find('.projects-list-item__client')
		// 		.innerText.trim()
		// 		.toLowerCase(),
		// 	'No client text found'
		// ).to.equal(project.client.toLowerCase());

		expect(find('.projects-list-item__title')).to.exist;
		// expect(
		// 	find('.projects-list-item__title')
		// 		.innerText.trim()
		// 		.toLowerCase(),
		// 	'No title text found'
		// ).to.equal(project.title.toLowerCase());

		expect(find('.projects-list-item__client-background'), 'No background label rendered').to
			.exist;
		expect(
			find('.projects-list-item__client-background')
				.innerText.trim()
				.toLowerCase()
		).to.equal(project.client.toLowerCase());
	});

	it('adds and removes it’s style to the headData service', function() {
		expect(this.get('headData.inlineStyles')).to.have.lengthOf(0);

		this.set('show', true);
		this.render(hbs`{{#if show}}{{projects-list-item project=project}}{{/if}}`);

		expect(this.get('headData.inlineStyles')).to.have.lengthOf(1);
		expect(this.get('headData.inlineStyles.0')).to.match(/#0096DA/);

		this.set('show', false);

		expect(this.get('headData.inlineStyles')).to.have.lengthOf(0);
	});
});
