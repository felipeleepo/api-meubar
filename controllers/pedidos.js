const mysql = require('../mysql').pool;

exports.visualizarPedidos = (req, res, next) => {
    mysql.getConnection((erros, con) => {

        if (erros) {
            return res.status(500).send({
                mensagem: "Falha na conexão com o banco",
                error : erros
            })
        }
        con.query(
            `SELECT m.id_mesa, grupo_id_apelido(p.id_grupo) as id_grupo, status_pedido(p.status) AS status, i.nome,  DATE_FORMAT(p.data_pedido, '%d/%m/%Y %H:%i:%s') as data_pedido FROM pedidos AS p
            JOIN itens AS i ON p.id_item = i.id_item
            JOIN grupos AS g ON p.id_grupo = g.id_grupo
            JOIN mesas AS m ON g.id_mesa = m.id_mesa
            ORDER BY  m.id_mesa, g.id_grupo, p.status, data_pedido;`,
            [],
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

        // GERANDO INSERTS PELA QUANTIDADE DE PEDIDOS
        let sql = 'INSERT INTO pedidos (id_grupo, id_item, valor, obs) VALUES\n'
        let i = 0
        req.body.pedidos.forEach(e => {
            sql += ` (${req.body.id_grupo}, ${e.id_item}, ${e.preco}, '${req.body.obs}')`
            if(i < req.body.pedidos.length-1)
                sql += `,\n`
            i++
        });

        con.query(
            sql,
            [],
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
                    id_pedido : result.insertId
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