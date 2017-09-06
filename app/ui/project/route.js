import Route from '@ember/routing/route';
import TranslationFile from 'anfema/locales/en/translations';

export default Route.extend({
	beforeModel(params) {
		if (!(TranslationFile.hasOwnProperty(params.state.params.project.project_id))) {
			this.transitionTo('index');
		}
	},

	model(params) {
		const pId = params.project_id;

		return {
			pHeader: TranslationFile.pHeader,
			title: TranslationFile[pId].title,
		};
	},
});
