import _ from 'underscore';
import moment from 'moment';

angular.module('escola')
  .controller('LivrosCtrl', ['$scope', livrosCtrl]);


function livrosCtrl($scope) {
  let vm = this;

  $scope.livrosList = [];

  _observarLivros($scope);

  _.extend($scope, {
    "criar": _criar.bind(vm),
    "devolver": _devolver.bind(vm)
  });
}

function _devolver(livro) {
  var vm = this;

  Meteor.call('devolver', livro, function () {
    delete livro.locacao;
    Util.$apply();
  });

}

function _criar() {
  var vm = this;
    Livros.insert({
      nome: vm.novoNome
    });
    vm.novoNome = '';
};



function _observarLivros($scope) {
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
}
