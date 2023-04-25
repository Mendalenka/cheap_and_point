let express = require(`express`);
let app = express();
let port = 3000;

app.listen(port, function () {
    console.log(`http://localhost:${port}`)
});

//Раздача статики
app.use(express.static(`public`));

//Настройка handlebars
let hbs = require(`hbs`);
app.set('views', 'views');
app.set('view engine', 'hbs');

//POST-запросы
app.use(express.urlencoded({ extended: true }));

//faker настройка
let { faker } = require(`@faker-js/faker`);

//mongoose настройка
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/cheap&point');

let schemaCloth = new mongoose.Schema({
    category: String,
    title: String,
    price: Number,
    discount: Number,
    last_price: Number
});

let Cloth = mongoose.model(`cloth`, schemaCloth);

app.get('/', async function (req, res) {

    let cloth = await Cloth.find();
    res.render('index', {cloth:cloth});

});