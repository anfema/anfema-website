import EmberRouter from '@ember/routing/router';
import { inject as service } from '@ember/service';
import config from './config/environment';

// eslint-disable-next-line import/exports-last
export default class Router extends EmberRouter {
	@service
	headData;

	location = config.locationType;
	rootURL = config.rootURL;

	setTitle(title) {
		this.headData.title = title;
	}
}

Router.map(function() {
	this.route('language', { path: '/:language_id' }, function() {
		this.route('projects', { resetNamespace: true }, function() {
			this.route('detail', { path: '/:project_id' });
		});
		this.route('imprint', { resetNamespace: true });
	});
});
