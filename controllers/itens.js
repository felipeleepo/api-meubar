const mysql = require('../mysql').pool;

exports.getItens = (req, res, next) => {

    mysql.getConnection((erros, con) => {

        if (erros) {
            return res.status(500).send({
                mensagem: "Falha na conexão com o banco",
                error : erros
            })
        }
        con.query(
            `SELECT i.id_item, i.nome, i.descricao, i.preco, s.descricao AS secao, 0 AS qtd FROM itens AS i
            JOIN secoes AS s ON i.id_secao = s.id_secao
            WHERE i.ativo = TRUE`,
            (error, result, field) => {
                con.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(200).send({
                    mensagem: "GET itens",
                    response : result
                })
            }
        )
    });
}

exports.postItem = (req, res, next) => {

    mysql.getConnection((erros, con) => {

        if (erros) {
            return res.status(500).send({
                mensagem: "Falha na conexão com o banco",
                error : erros
            })
        }

        con.query(
            'INSERT INTO itens (nome, descricao, preco, preco_custo) VALUES (?, ?, ?, ?)',
            [
                req.body.nome,
                req.body.descricao,
                req.body.preco,
                req.body.preco_custo
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
                    mensagem: "Item criado.",
                    id_item : result.insertId
                })
            }
        )
    });
}

exports.patchItem = (req, res, next) => {

    mysql.getConnection((erros, con) => {

        if (erros) {
            return res.status(500).send({
                mensagem: "Falha na conexão com o banco",
                error : erros
            })
        }

        con.query(
            `UPDATE itens
                SET nome = ?,
                    descricao = ?,
                    preco = ?,
                    preco_custo = ?
                WHERE id_item = ?`,
            [
                req.body.nome,
                req.body.descricao,
                req.body.preco,
                req.body.preco_custo,
                req.body.id_item,
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
                    mensagem: "Item alterada.",
                })
            }
        )
    });
}