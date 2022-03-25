let transacoes = [];

const { nanoid } = require('nanoid');

class TransacoesController {

    async mostraCadastro(req, res) {
        return res.render('cadastrar');
    }

    async listar(req, res) {
        console.log("listar transacoes")
        return res.render('index', { transacoes: transacoes, user: req.session.user });
    }

    async deletar(req, res) {
        const { id } = req.params;

        const transacaoIdx = transacoes.findIndex(f => f.id == id);
        transacoes.splice(transacaoIdx, 1);

        return res.redirect('/transacoes')
    }

    async detalhar(req, res) {
        const { id } = req.params;

        const transacaoFiltrada = transacoes.filter(f => f.id == id);
        if (transacaoFiltrada.length > 0) {
            
            return res.render('detalhar', { transacao: transacaoFiltrada[0] });
        } else {
            return res.send('Transação não encontrada');
        }
    }

    async cadastrar(req, res) {
        transacoes.push({
            id: nanoid(8),
            ...req.body
        });
        return res.redirect('/transacoes');
    }
}

module.exports = { TransacoesController }