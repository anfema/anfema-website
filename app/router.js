import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType,
	rootURL: config.rootURL,
});

// eslint-disable-next-line array-callback-return
Router.map(function () {
	this.route('projects');
	this.route('project', { path: 'project/:id' });
	this.route('contact');
	this.route('jobs');
	this.route('job', { path: 'job/:id' });
	this.route('imprint');
});

export default Router;
