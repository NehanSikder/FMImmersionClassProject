var app = angular.module("calculator", []);
app.config(['$routeProvider', '$locationProvider',  function($routeProvider, $locationProvider) {
  $routeProvider.
      when(
        '/', {templateUrl: '/static/templates/main.html'});
      // index.html is the home page, but has nothing for now.
      
  $locationProvider.html5Mode(true);
}]);
