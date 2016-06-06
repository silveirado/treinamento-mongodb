angular.module('escola')
.config(['$stateProvider', livrosRoute]);

function livrosRoute($stateProvider) {

  $stateProvider
  .state('livros', {
    url: '/v',
    templateUrl: 'client/livros/livros-list.view.ng.html',
    controller: 'LivrosCtrl as livros',
  });

}
