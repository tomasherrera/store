(function() {
  var app = angular.module('store', ['filters.camelcase', "ngResource", 'ngRoute', 'ngAnimate', 'flash', 'templates', 'restangular', '720kb.tooltips']);

  app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    // We need this line to send posts.
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    
    $routeProvider
      .when('/', {
        templateUrl: 'sales.html',
        controller: 'SalesController'
      })
      ;
  }]);

  app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
})();