(function () {
    'use strict';	

    var app = angular.module('store');

	app.factory('StoreNowDataService', ['Restangular', function(Restangular){

	
	var baseUrl = '/api/';
	var storeNowDataService = {};

	

	storeNowDataService.getItems = function ()
	{
		var url = baseUrl + 'items.json';
		return Restangular.oneUrl('items', url);

	}

	storeNowDataService.getSales = function ()
	{
		var url = baseUrl + 'sales.json';
		return Restangular.oneUrl('sales', url);

	}

	storeNowDataService.saveSale = function (sale)
	{
		var url = baseUrl + 'sales.json';
		return Restangular.all(url).post( sale );

	}

	storeNowDataService.getCustomers = function ()
	{
		var url = baseUrl + 'customers.json';
		return Restangular.all(url);

	}

	storeNowDataService.updateJob = function (jobToUpdate)
	{
		var url = baseUrl + 'jobs/' + jobToUpdate.id + '.json';
		
		return Restangular.all(url).customPUT(jobToUpdate);
		
	}	
	
	return storeNowDataService;

	
	}]);
}());