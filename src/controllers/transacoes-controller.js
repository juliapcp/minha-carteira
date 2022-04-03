let transacoes = [];
const { get } = require('express/lib/response');
const { nanoid } = require('nanoid');
class TransacoesController {

    async mostraCadastro(req, res) {
        return res.render('cadastroTransacao', {user: req.session.user});
    }

    async listar(req, res) {
        return res.render('index', { transacoes: getTransacoesUser(), user: req.session.user, resumoTransacoes: getResumoTransacoes() });
    }

    async deletar(req, res) {
        const { id } = req.params;

        const transacaoId =getTransacoesUser().findIndex(t => t.id == id);
        transacoes.splice(transacaoId, 1);

        return res.redirect('/transacoes')
    }

    async detalhar(req, res) {
        const { id } = req.params;

        const transacaoFiltrada = getTransacoesUser().filter(t => t.id == id);
        if (transacaoFiltrada.length > 0) {
            
            return res.render('detalhar', { transacao: transacaoFiltrada[0] });
        } else {
            return res.send('Transação não encontrada');
        }
    }

    async cadastrar(req, res) {
        transacoes.push({
            id: nanoid(8),
            emailUser: req.session.user,
            ...req.body
        });
        return res.redirect('/transacoes');
    }

}
function getTransacoesUser() {
    return transacoes.filter(t => t.emailUser == req.session.user);
}

function getResumoTransacoes(){
    const resumoTransacoes = { receita: '--', despesa: '--', saldo: '--' };
    if(getTransacoesUser().length>0){
        let receita = 0;
        let despesa = 0;
        getTransacoesUser().forEach(transacao=>{
            if(transacao.tipo = 'R'){
                receita += transacao.valor;
            } else {
                despesa += transacao.valor;
            }
        });
        resumoTransacoes.receita = receita;
        resumoTransacoes.despesa = despesa;
        resumoTransacoes.saldo = receita-despesa;
    }
    return resumoTransacoes;
}

module.exports = { TransacoesController }