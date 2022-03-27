const users = []

class UsersController {
    async cadastrar(req, res) {
        const user = req.body;
        users.push(user);
        console.log(users);
        res.redirect('/');

    }
    async mostraLogin(req, res) {
        return res.render('login', {});
    }
    async login(req, res) {
        const { email, senha } = req.body;
        const userEncontrado = users.find(u => u.email == email);
        if (!userEncontrado) return res.send('User não encontrado');

        if (userEncontrado.senha == senha) {
            req.session.user = userEncontrado;
            return res.redirect('/');
        } else {
            return res.redirect('/login');
        }
    }
    async mostraCadastro(req, res) {
        return res.render('cadastro', {});
    }
    async cadastro(req, res) {
    
    }
}

module.exports = UsersController;