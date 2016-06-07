import moment from 'moment';

Meteor.methods({
    "devolver": _devolver
});

function _devolver(livro) {

    let historicoAluno = Alunos.aggregate(
        [{
            $match: {
                "_id": livro.locacao.aluno_id
            }
        }, {
            $unwind: {
                "path": "$historico",
                "includeArrayIndex": "position"
            }
        }, {
            $match: {
                'historico.livro_id': livro._id,
                'historico.data_devolucao': {
                    $exists: false
                }
            }
        }, {
            $project: {
                "position": true,
                "_id": false
            }
        }]
    );

    if (historicoAluno && historicoAluno[0] && typeof historicoAluno[0].position !== 'undefined') {
        let set = {};
        set[`historico.${historicoAluno[0].position}.data_devolucao`] = moment().toDate();
        Alunos.update({
            "_id": livro.locacao.aluno_id,
        }, {
            $set: set
        });
    }

    let historicoLivro = Livros.aggregate(
        [{
            $match: {
                "_id": livro._id
            }
        }, {
            $unwind: {
                "path": "$historico",
                "includeArrayIndex": "position"
            }
        }, {
            $match: {
                'historico.aluno_id': livro.locacao.aluno_id,
                'historico.data_devolucao': {
                    $exists: false
                }
            }
        }, {
            $project: {
                "position": true,
                "_id": false
            }
        }]
    );

    if (historicoLivro && historicoLivro[0] && typeof historicoLivro[0].position  !== 'undefined') {
        let set = {};
        set[`historico.${historicoLivro[0].position}.data_devolucao`] = moment().toDate();

        Livros.update({
            "_id": livro._id
        }, {
            $set: set,
            $unset: {
                "locacao": 1
            }
        });
    }
}
