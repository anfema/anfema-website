import Route from '@ember/routing/route';
import TranslationFile from 'anfema/locales/en/translations';

export default Route.extend({
	beforeModel(params) {
		if (!(TranslationFile.hasOwnProperty(params.state.params.job.job_id))) {
			this.transitionTo('index');
		}
	},

	model(params) {
		const jId = params.job_id;

		return {
			jHeader: TranslationFile.jHeader,
			title: TranslationFile[jId].title,
		};
	},
});
