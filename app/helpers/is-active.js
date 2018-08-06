import Ember from 'ember';

function handleQueryParams(params) {
	const possibleQueryParams = params[params.length - 1];

	if (possibleQueryParams && possibleQueryParams.isQueryParams) {
		// ensure to handle potentially frozen arrays
		params = params.slice();

		params[params.length - 1] = {
			queryParams: possibleQueryParams.values,
		};
	}

	return params;
}

export default Ember.Helper.extend({
	router: Ember.inject.service(),

	compute(_params) {
		const params = handleQueryParams(_params);

		return this.get('router').isActive(...params);
	},
});
