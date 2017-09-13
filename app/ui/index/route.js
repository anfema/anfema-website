import Route from '@ember/routing/route';
import PrefixMixin from 'anfema/mixins/prefix-mixin';

export default Route.extend(PrefixMixin, {
	prefix: null,

	model() {
		return {
			prefix: this.get('prefix'),
			services: {
				concept: {
					title: 'concept title',
					text: 'concept text',
				},
				design: {
					title: 'design title',
					text: 'design text',
				},
				development: {
					title: 'development title',
					text: 'development text',
				},
				consulting: {
					title: 'consulting title',
					text: 'consulting text',
				},
				support: {
					title: 'support title',
					text: 'support text',
				},
				management: {
					title: 'management title',
					text: 'management text',
				},
			},
		};
	},
});
