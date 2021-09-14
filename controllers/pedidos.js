const mysql = require('../mysql').pool;

exports.getPedidos = (req, res, next) => {
    const id = req.params.id_grupo
    mysql.getConnection((erros, con) => {

        if (erros) {
            return res.status(500).send({
                mensagem: "Falha na conexão com o banco",
                error : erros
            })
        }
        con.query(
            'SELECT * FROM pedidos WHERE id_grupo = ?',
            [id],
            (error, result, field) => {
                con.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(200).send({
                    mensagem: "GET pedidos",
                    response : result
                })
            }
        )
    });
}

exports.getPedidosMesa = (req, res, next) => {
    const id = req.params.id_mesa
    mysql.getConnection((erros, con) => {

        if (erros) {
            return res.status(500).send({
                mensagem: "Falha na conexão com o banco",
                error : erros
            })
        }
        con.query(
            `SELECT * FROM pedidos 
            JOIN grupos ON grupos.id_grupo = pedidos.id_grupo
            WHERE grupos.id_mesa = ?`,
            [id],
            (error, result, field) => {
                con.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(200).send({
                    mensagem: "GET Pedidos da Mesa",
                    response : result
                })
            }
        )
    });
}

exports.postPedido = (req, res, next) => {

    mysql.getConnection((erros, con) => {

        if (erros) {
            return res.status(500).send({
                mensagem: "Falha na conexão com o banco",
                error : erros
            })
        }

        con.query(
            'INSERT INTO pedidos (id_grupo, id_item, valor, obs) VALUES (?, ?, ?, ?)',
            [
                req.body.id_grupo,
                req.body.id_item,
                req.body.valor,
                req.body.obs
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
                    mensagem: "Pedido criado.",
                    id_mesa : result.insertId
                })
            }
        )
    });
}

exports.patchPedido = (req, res, next) => {

    mysql.getConnection((erros, con) => {

        if (erros) {
            return res.status(500).send({
                mensagem: "Falha na conexão com o banco",
                error : erros
            })
        }

        con.query(
            `UPDATE pedidos
                SET id_grupo = ?,
                status = ?,
                obs = ?
                WHERE id_pedido = ?`,
            [
                req.body.id_grupo,
                req.body.status,
                req.body.obs,
                req.body.id_pedido
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
                    mensagem: "Pedido alterado.",
                })
            }
        )
    });
}