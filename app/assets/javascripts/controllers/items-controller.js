(function () {
    'use strict';

    var app = angular.module('store');

    // HOME CONTROLLER
    app.controller("ItemsController", ['$scope', '$resource', '$route', '$routeParams', '$location', 'Flash', 'StoreNowDataService', function($scope, $resource, $route, $routeParams, $location, Flash, StoreDataService) {
      $scope.getItems = function(){
        StoreNowDataService.getItems().get().then(function(response) {
          $scope.items = response.plain();
            
        });
      };

    }]);//END OF HEADER CONTROLLER

}());