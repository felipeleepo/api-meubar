const mysql = require('../mysql').pool;

exports.getGrupos = (req, res, next) => {

    mysql.getConnection((erros, con) => {

        if (erros) {
            return res.status(500).send({
                mensagem: "Falha na conexão com o banco",
                error : erros
            })
        }
        con.query(
            `SELECT g.id_grupo AS id, g.id_mesa, g.descricao FROM grupos AS g
            JOIN mesas AS m ON g.id_mesa = m.id_mesa
            WHERE m.status IN (1, 2)
            `,
            (error, result, field) => {
                con.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(200).send({
                    mensagem: "GET grupos",
                    response : result
                })
            }
        )
    });
}

exports.postGrupo = (req, res, next) => {

    mysql.getConnection((erros, con) => {

        if (erros) {
            return res.status(500).send({
                mensagem: "Falha na conexão com o banco",
                error : erros
            })
        }

        con.query(
            'INSERT INTO grupos (id_mesa, qtd) VALUES (?, ?)',
            [ 
                req.body.id_mesa,
                req.body.qtd
            ],
            (error, result, field) => {
                con.release();

                if (error) {
                    return res.status(500).send({
                        mensagem : "Erro durante a consulta",
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: "Grupo criado.",
                    id_mesa : result.insertId
                })
            }
        )
    });
}

exports.patchGrupo = (req, res, next) => {

    mysql.getConnection((erros, con) => {

        if (erros) {
            return res.status(500).send({
                mensagem: "Falha na conexão com o banco",
                error : erros
            })
        }

        con.query(
            `UPDATE grupos
                SET qtd = ?
                WHERE id_grupo = ?`,
            [
                req.body.qtd,
                req.body.id_grupo
            ],
            (error, result, field) => {
                con.release();

                if (error) {
                    return res.status(500).send({
                        mensagem : "Erro durante a consulta",
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: "Mesa alterada.",
                })
            }
        )
    });
}