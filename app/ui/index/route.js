import Route from '@ember/routing/route';
import PrefixMixin from 'anfema/mixins/prefix-mixin';

export default Route.extend(PrefixMixin, {
	prefix: null,

	model() {
		return {
			prefix: this.get('prefix'),
			services: [
				{
					id: 'concept',
					title: 'concept title',
					text: 'concept text',
					hidden: false,
				}, {
					id: 'design',
					title: 'design title',
					text: 'design text',
					hidden: true,
				}, {
					id: 'development',
					title: 'development title',
					text: 'development text',
					hidden: true,
				}, {
					id: 'consulting',
					title: 'consulting title',
					text: 'consulting text',
					hidden: true,
				}, {
					id: 'support',
					title: 'support title',
					text: 'support text',
					hidden: true,
				}, {
					id: 'management',
					title: 'management title',
					text: 'management text',
					hidden: true,
				},
			],
		};
	},
});
