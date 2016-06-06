angular.module('escola')
.config(['$stateProvider', alunosRoute]);

function alunosRoute($stateProvider) {

  $stateProvider
  .state('alunos', {
    url: '/alunos',
    templateUrl: 'client/alunos/alunos-list.view.ng.html',
    controller: 'AlunosCtrl as alunos',
  });

}
