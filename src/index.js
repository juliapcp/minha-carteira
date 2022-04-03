
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/view');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const session = require('express-session');

app.use(session({
    secret: 'oeRf3fJ4eG3flxv30XvUcuOcDwoLyJtboDql',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

app.use(express.static('public'));

app.get('*', (req, res, next)=> {
    if (req.url != '/user/login' && req.url != '/user/cadastro'){
        if (!req.session.user) {
            res.redirect('/user/login');
        } else {
            next();
        }
    } else {
        next();
    }
})

const TransacoesRouter = require('./routes/transacoes-routes');
app.use('/transacoes', TransacoesRouter);

const UserRouter = require('./routes/user-routes');
app.use('/user', UserRouter);

app.get('/', (req, res) => {
    res.redirect('/transacoes');
});

app.listen(3000, () => console.log('Server iniciado na porta 3000'));