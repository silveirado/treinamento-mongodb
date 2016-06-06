import _ from 'underscore';

angular.module('escola')
  .controller('AlunosCtrl', ['$scope', alunosCtrl]);


function alunosCtrl($scope) {
  let vm = this;

  $scope.alunosList = [];

  Alunos
    .find({})
    .observe({
      added: function(doc) {
        $scope.alunosList.push(doc);
        Util.$apply();
      },
      removed: function(doc) {
        $scope.alunosList = _.reject($scope.alunosList, a => a._id === doc._id);
        Util.$apply();
      },
      updated: function(doc) {
        $scope.alunosList = _.map($scope.alunosList, a => a._id === doc._id ? doc : a);
        Util.$apply();
      }

    });


  $scope.criar = function () {
      Alunos.insert({
        nome: vm.novoNome
      });
      vm.novoNome = '';
  };

  $scope.excluir = function (doc) {
    Alunos.remove({"_id": doc._id});
  };

}
