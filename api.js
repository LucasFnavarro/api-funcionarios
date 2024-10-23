const express = require('express');
const mysql = require('mysql2');

const functions = require('./inc/functions');
const mysql_config = require('./inc/mysql_config');

const app = express();
const PORT = 3333;
app.listen(PORT, () => {
    console.log('Api rodando 🚀.');
});

const conn = mysql.createConnection(mysql_config);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

API_ACTIVE = true;
API_VERSION = '1.0.0';

app.use((req, res, next) => {
    if (API_ACTIVE) {
        next();
    } else {
        res.json(functions.response('Error', 'Api em manutenção, desculpe!', 0));
    }
});

app.get('/', (req, res) => {
    res.json(functions.response('Success', 'Bem-vindo(a) à nossa API!'));
});

// pegar todos os funcionarios
app.get('/funcionarios', (req, res) => {
    conn.query('SELECT * FROM funcionarios', (err, data) => {
        if (!err) {
            if (data.length > 0) {
                res.json(functions.response('Succes', 'Todos os funcionarios cadastrado', data.length, data));
            } else {
                res.json(functions.response('Error', 'Não encontramos nenhum funcionario', 0));
            }
        } else {
            res.json(functions.response('Error', 'Houve um erro ao processar a requisição, tente novamente!', 0));
        }
    });
});

app.get('/funcionarios/:id', (req, res) => {
    const id = req.params.id;

    conn.query(`SELECT * FROM funcionarios WHERE ?? = ?`, ['id', id], (err, data) => {
        if (!err) {
            if (data.length > 0) {
                res.json(functions.response('Success', 'Usuário via ID encontrado!', 0, data));
            } else {
                res.json(functions.response('Error', 'Não encontramos nenhum funcionario', 0));
            }
        } else {
            res.json(functions.response('Error', 'Houve um erro ao processar a requisição, tente novamente!', 0));
        }
    });
});


app.post('/funcionarios/create', (req, res) => {
    const dados = { nome, cargo } = req.body;


});