import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';
import Service from '@ember/service';
import { A } from '@ember/array';

const headDataStub = Service.extend({
	projectsListItemStyles: A(),
});

describe('Integration | Component | projects list item', function() {
	setupComponentTest('projects-list-item', {
		integration: true,
	});

	const project = { client: 'BMW', color: '#0096DA', id: 'bmw7series', title: '7 Series Presenter App' };

	beforeEach(function() {
		this.register('service:head-data', headDataStub);
		this.inject.service('head-data', { as: 'headData' });
		this.set('project', project);
	});

	it('renders', function() {
		this.render(hbs`{{projects-list-item project=project}}`);

		expect(find('.projects-list-item')).to.exist;

		expect(find('.projects-list-item__client')).to.exist;
		expect(
			find('.projects-list-item__client')
				.innerText.trim()
				.toLowerCase()
		).to.equal(project.client.toLowerCase());

		expect(find('.projects-list-item__title')).to.exist;
		expect(
			find('.projects-list-item__title')
				.innerText.trim()
				.toLowerCase()
		).to.equal(project.title.toLowerCase());

		expect(find('.projects-list-item__client-background')).to.exist;
		expect(
			find('.projects-list-item__client-background')
				.innerText.trim()
				.toLowerCase()
		).to.equal(project.client.toLowerCase());
	});

	it('adds and removes it’s style to the headData service', function() {
		expect(this.get('headData.projectsListItemStyles')).to.have.lengthOf(0);

		this.set('show', true);
		this.render(hbs`{{#if show}}{{projects-list-item project=project}}{{/if}}`);

		expect(this.get('headData.projectsListItemStyles')).to.have.lengthOf(1);
		expect(this.get('headData.projectsListItemStyles.0')).to.match(/#0096DA/);

		this.set('show', false);

		expect(this.get('headData.projectsListItemStyles')).to.have.lengthOf(0);
	});
});