import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend({
	location: config.locationType,
	rootURL: config.rootURL,
	headData: service(),

	setTitle(title) {
		this.get('headData').set('title', title);
	},
});

// eslint-disable-next-line array-callback-return

Router.map(function() {
	this.route('language', { path: '/:language_id' }, function() {
		this.route('projects', { path: '/projects', resetNamespace: true }, function() {
			this.route('detail', { path: '/:project_id' });
		});
		this.route('imprint', { path: '/imprint', resetNamespace: true });
	});
});

export default Router;
