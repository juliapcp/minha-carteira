
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/view');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const session = require('express-session')
app.use(session({
    secret: 'oeRf3fJ4eG3flxv30XvUcuOcDwoLyJtboDql',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

app.use(express.static('public'));

const TransacoesRouter = require('./routes/transacoes-routes');
app.use('/transacoes', TransacoesRouter);

app.use('*', (req, res, next) => {
    console.log(`Request recebido para ${req.baseUrl} as ${new Date()}`);
    next();
})

app.get('/', (req, res) => {
    res.redirect('/transacoes');
});

app.use('*', (req, res) => {
    return res.status(404).send(`
        <h1>Desculpe, não encontramos essa página.</h1>
    `);
})

app.listen(3000, () => console.log('Server iniciado na porta 3000'));