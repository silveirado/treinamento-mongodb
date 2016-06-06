import _ from 'underscore';

angular.module('escola')
  .controller('LivrosCtrl', ['$scope', livrosCtrl]);


function livrosCtrl($scope) {
  let vm = this;

  $scope.livrosList = [];

  Livros
    .find({})
    .observe({
      added: function(doc) {
        $scope.livrosList.push(doc);
        Util.$apply();
      },
      removed: function(doc) {
        $scope.livrosList = _.reject($scope.livrosList, a => a._id === doc._id);
        Util.$apply();
      },
      updated: function(doc) {
        $scope.livrosList = _.map($scope.livrosList, a => a._id === doc._id ? doc : a);
        Util.$apply();
      }

    });


  $scope.criar = function () {
      Livros.insert({
        nome: vm.novoNome
      });
      vm.novoNome = '';
  };

  $scope.excluir = function (doc) {
    Livros.remove({"_id": doc._id});
  };

}
