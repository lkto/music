(function() {
	'use strict';

	angular
		.module('musicband.news')
		.factory('newsService', newsService);

	newsService.$inject = ['$http', '$q', 'appSettings'];

	/* @ngInject */
	function newsService($http, $q, appSettings) {
		var url = appSettings.getSettings().newsJSONURI;
		var result = [];

		var service = {
			all: all,
			get: get
		};
		return service;

		// *******************************************************

		// http://stackoverflow.com/questions/17533888/s3-access-control-allow-origin-header
		function all(callback){
			$http.get(url)
				.success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					result = data.result;
					callback(result);
				})
				.error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log('ERROR (News):' + status);
					callback(result);
				});
		}

		function get(articleId) {
			// we take an article from cache but we can request ir from the server
			for (var i = 0; i < result.length; i++) {
				if (result[i].id === articleId) {
					return $q.when(result[i]);
				}
			}
			return $q.when(null);
		}
	}
})();
