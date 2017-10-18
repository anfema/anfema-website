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
		width: 684,
		height: 513,
		videos: [
			{
				path: 'path-to-video',
				type: 'mp4',
			},
		],
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

		expect(find('.content-project-video__video').getAttribute('width')).to.equal('684');
		expect(find('.content-project-video__video').getAttribute('height')).to.equal('513');
		expect(find('source').getAttribute('type')).to.equal('video/mp4');
		expect(find('source').getAttribute('src')).to.equal('path-to-video');
	});
});
