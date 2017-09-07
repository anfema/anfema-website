import { expect } from 'chai';
import { describe, it } from 'mocha';
import EmberObject from 'ember-object';
import PrefixMixinMixin from 'anfema/mixins/prefix-mixin';

describe('Unit | Mixin | prefix mixin', function () {
	// Replace this with your real tests.
	it('works', function () {
		const PrefixMixinObject = EmberObject.extend(PrefixMixinMixin);
		const subject = PrefixMixinObject.create();

		expect(subject).to.be.ok;
	});
});
