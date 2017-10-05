import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

describe('Integration | Component | content project video', function() {
	setupComponentTest('content-project-video', {
		integration: true,
	});

	const data = {
		title: 'title',
		text: 'text',
		videoPath: 'path-to-video',
	};

	beforeEach(function() {
		this.set('data', data);
		this.render(hbs`
			{{content-project-video data=data}}
		`);
	});

	it('renders', function() {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function (val) { ... });
		// Template block usage:
		// this.render(hbs`
		// 	{{#content-project-video}}
		// 		template content
		// 	{{/content-project-video}}
		// `);

		expect(find('.content-project-video__title').innerText.trim()).to.equal('title');
		expect(find('.content-project-video__text').innerText.trim()).to.equal('text');
		expect(findAll('.content-project-video__video')[0].getAttribute('src')).to.equal('path-to-video');
	});
});
