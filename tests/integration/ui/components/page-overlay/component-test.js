import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import initializer from 'anfema/initializers/page-overlay';

describe('Integration | Component | page overlay', function() {
	setupComponentTest('page-overlay', {
		integration: true,
	});

	beforeEach(function() {
		if (document !== 'undefined') {
			const foo = document.createElement('div');

			foo.id = 'foo';

			document.body.appendChild(foo);
		}
	});

	afterEach(function() {
		document.getElementById('foo').remove();
	});

	it('renders', function() {
		this.container.lookup('service:page-overlay').set('destinationElementId', 'foo');

		this.render(hbs`{{page-overlay}}`);

		expect(find()).to.exist;
	});
});
