const users = []

class UsersController {
    async cadastrar(req, res) {
        const user = req.body;
        users.push(user);
        res.redirect('/');

    }
    async mostraLogin(req, res) {
        return res.render('login', {});
    }
    async login(req, res) {
        const { email, senha } = req.body;
        const userEncontrado = users.find(u => u.email == email);
        const msg = {}; msg.titulo = "Tente novamente";
        msg.mensagem = "Email ou senha inválidos.";
        if (!userEncontrado){
            return res.render('login', { msg: msg });
        } else if (userEncontrado.senha == senha) {
            req.session.user = userEncontrado;
            return res.redirect('/');
        } else {
            return res.render('login', {msg: msg});
        }
    }
    async mostraCadastro(req, res) {
        return res.render('cadastro', {});
    }
    async cadastro(req, res) {
        const user = req.body;
        const userEncontrado = users.find(u => u.email == user.email);
        if(userEncontrado){
            const msg = {}; msg.titulo = "E-mail em uso";
            msg.mensagem = "Este e-mail já está em uso em um cadastro na Minha Carteira. Tente fazer login.";
            return res.render('login', { msg: msg });
        } else {
            users.push(user);
            req.session.user = user;
            return res.redirect('/');
        }

    }
}

module.exports = UsersController;    