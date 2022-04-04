let transacoes = [];
const { nanoid } = require('nanoid');
class TransacoesController {

    async mostraCadastro(req, res) {
        return res.render('cadastroTransacao', {user: req.session.user, transacao: {}});
    }

    async cadastrar(req, res) {
        let user = req.session.user;
        transacoes.push({
            id: nanoid(8),
            emailUser: user.email,
            ...req.body
        });
        const msg = {}; msg.titulo = "Sucesso"; msg.mensagem = "Transação cadastrada com sucesso!";
        return res.render('index', { transacoes: getTransacoesUser(user), user: user, resumoTransacoes: getResumoTransacoes(user), msg:msg});
    }

    async listar(req, res) {
        let user = req.session.user;
        const query = req.query;
        const campo = Object.keys(query)[0];
        const valor = query[campo];
        const retorno ={};
        let transacoesFiltradas = getTransacoesUser(user);
        if(typeof(valor) != "undefined"){
            retorno.campo = campo;
            retorno.valor = valor;
            transacoesFiltradas = transacoesFiltradas.filter(transacao => transacao[campo].toUpperCase().includes(valor));
        }
        return res.render('index', { transacoes: transacoesFiltradas, user: user, resumoTransacoes: getResumoTransacoes(user), query: retorno });
    }

    async deletar(req, res) {
        const { id } = req.params;
        let user = req.session.user;
        const transacaoId = getTransacoesUser(req.session.user).findIndex(t => t.id == id);
        transacoes.splice(transacaoId, 1);
        const msg = {}; msg.titulo = "Sucesso"; msg.mensagem = "Transação excluída com sucesso!";
        return res.render('index', { transacoes: getTransacoesUser(user), user: user, resumoTransacoes: getResumoTransacoes(user), msg: msg });
    }

    async detalhar(req, res) {
        const { id } = req.params;
        let user = req.session.user;
        const transacaoFiltrada = getTransacoesUser(user).filter(t => t.id == id);
        if (transacaoFiltrada.length > 0) {
            
            return res.render('detalheTransacao', { transacao: transacaoFiltrada[0], user: user});
        } else {
            return res.send('Transação não encontrada');
        }
    }

    async mostraEdicao(req, res){
        const { id } = req.params;
        const transacaoFiltrada = getTransacoesUser(req.session.user).filter(t => t.id == id);
        if (transacaoFiltrada.length > 0) {
            return res.render('cadastroTransacao', { user: req.session.user, transacao: transacaoFiltrada[0] });
        } else {
            return res.send('Transação não encontrada');
        }
    }
    async editar(req, res){
        const { id } = req.params;
        const transacaoId = getTransacoesUser(req.session.user).findIndex(t => t.id == id);
        const msg = {}; msg.titulo = "Sucesso"; msg.mensagem = "Transação alterada com sucesso!";
        let user = req.session.user;

        transacoes.splice(transacaoId, 1);
        transacoes.push({
            id: nanoid(8),
            emailUser: user.email,
            ...req.body
        });

        return res.render('index', { transacoes: getTransacoesUser(user), user: user, resumoTransacoes: getResumoTransacoes(user), msg: msg });
    }

    

}
function getTransacoesUser(user) {
    return transacoes.filter(t => t.emailUser == user.email);
}

function getResumoTransacoes(user){
    const resumoTransacoes = { receita: '--', despesa: '--', saldo: '--' };
    if (getTransacoesUser(user).length>0){
        let receita = 0;
        let despesa = 0;
        getTransacoesUser(user).forEach(transacao=>{
            if(transacao.tipo == 'R'){
                receita += parseFloat(transacao.valor);
            } else {
                despesa += parseFloat(transacao.valor);
            }
        });
        resumoTransacoes.receita = receita;
        resumoTransacoes.despesa = despesa;
        resumoTransacoes.saldo = receita-despesa;
    }
    return resumoTransacoes;
}

module.exports = { TransacoesController }