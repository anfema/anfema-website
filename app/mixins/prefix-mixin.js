import Mixin from '@ember/object/mixin';

export default Mixin.create({
	prefix: null,

	beforeModel(params) {
		// TODO @r.adofo
		//  if (intl.t(`homepage.projects.${params.state.params.project.project_id}.id`)
		// !== params.state.params.project.project_id) {
		//    this.transitionTo('index'); // TODO @r.adofo replace with 404 site
		// }

		let name = params.targetName;

		if (Object.keys(params.params[name]).length) {
			name = `${name}.${params.params[name].id}`;
		}
		this.set('prefix', `homepage.${name}.`);
	},

	model() {
		return {
			prefix: this.get('prefix'),
		};
	},
});
