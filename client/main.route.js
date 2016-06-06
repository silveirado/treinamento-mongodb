angular.module('escola')
  .config(['$urlRouterProvider', '$locationProvider', baseRoute]);

function baseRoute($urlRouterProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}
