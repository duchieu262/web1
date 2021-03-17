require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/webapp', {
	useUnifiedTopology: true,
	useNewUrlParser: true
}, (err) => {
	if (err) {
		console.log("Can't connect to database!")
	} else {
		console.log("Connected to database!")
	}
})

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var logOutRoute = require('./routes/logout.route');
var rigisterRoute = require('./routes/register.route')

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var login = require('./validate/function.js')

var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser('process.env.SESSION_SECRET'));
app.use(sessionMiddleware);

app.use(express.static('public'));

app.get('/', async function(req, res){
	const user = await login(req)
	res.render('index', {
		user: user
	});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/register', rigisterRoute)
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/logOut', authMiddleware.requireAuth, logOutRoute);




app.listen(port, function(){
	console.log('Server listening on port ' + port)
});
