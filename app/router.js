import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
    location: config.locationType,
    rootURL: config.rootURL,
});

// eslint-disable-next-line array-callback-return

Router.map(function () {
    this.route('language', { path: '/:language_id' }, function () {
        this.route('projects', { path: '/projects', resetNamespace: true }, function () {
            this.route('detail', { path: '/:project_id' });
        });
        this.route('imprint', { path: '/imprint', resetNamespace: true });
    });
});

export default Router;
