import _ from 'underscore';
import moment from 'moment';

angular.module('escola')
    .controller('AlunosCtrl', ['$scope', alunosCtrl])
    .filter('nomeLivro', _nomeLivroFilter);

function alunosCtrl($scope) {
    let vm = this;

    $scope.alunosList = [];

    _observeAlunos($scope);

    _.extend($scope, {
        "criar": _criar.bind(vm),
        "excluir": _excluir.bind(vm),
        "showLocar": _showLocar.bind(vm, $scope),
        "concluirLocacao": _concluirLocacao.bind(vm, $scope)
    })
}

function _nomeLivroFilter(){
  var livro=null;

  function retornarNome() {
      return livro.nome;
  }

  return function (id) {
    if (livro === null){
      Livros
        .find({"_id": id})
        .observe({
          added: function (doc) {
            livro = doc;
            console.log('ID', doc);
            Util.$apply();
          }
        })
      return "-";
    }else {
      return retornarNome();
    }
  }
}


function _concluirLocacao($scope, $index, aluno, livro) {
    if (aluno && livro) {
        Alunos.update({
            _id: aluno._id
        }, {
            $addToSet: {
                "historico": {
                    "livro_id": livro._id,
                    "data_locacao": moment().toDate()
                }

            }
        });

        Livros.update({
            "_id": livro._id
        }, {
            "$set": {
                "locacao": {
                    "aluno_id": aluno._id,
                    "data_locacao": moment().toDate()
                }
            },
            "$addToSet": {
                "historico": {
                    "aluno_id": aluno._id,
                    "data_locacao": moment().toDate()
                }
            }
        });
        $scope.locar[$index] = false;
    } else {
        alert('Selecione o livro');
    }
}

function _showLocar($scope, $index) {
    $scope.livrosDisponiveis = Livros.find({
        "locacao": {
            $exists: false
        }
    }).fetch();
    $scope.locar = ($scope.locar || []);
    $scope.locar[$index] = true;
}

function _excluir(doc) {
    Alunos.remove({
        "_id": doc._id
    });
}

function _criar() {
    var vm = this;
    Alunos.insert({
        nome: vm.novoNome
    });
    vm.novoNome = '';
}


function _observeAlunos($scope) {
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
}
