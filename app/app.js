import Application from '@ember/application';
import config from 'anfema/config/environment';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

// eslint-disable-next-line import/exports-last
export default class App extends Application {
	modulePrefix = config.modulePrefix;
	podModulePrefix = config.podModulePrefix;
	Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
