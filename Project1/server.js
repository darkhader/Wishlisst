const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session')
const https = require('https')
const fs = require('fs')
mongoose.connect(
	"mongodb://localhost/Project1"
, { useNewUrlParser: true }, (err) => {
    if (err) console.log(err)
    else console.log("Success")

});
const ProductRouter = require('./routers/productRouter');
const reviewRouter = require('./routers/reviewRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
	secret:"keybroadhero",
	resave:false,
	saveUninitialized:false,
	cookie:{
		secure:false,
		httpOnly:false,
		maxAge:7*24*60*60*1000
	}
}))
app.use(cors({ origin: [ "http://localhost:3000" ], credentials: true }));


app.get("/api", (req, res) => {

});
//api/images
app.use("/api/Products",ProductRouter );
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Middleware
app.use((req, res, next) => {
	console.log("404");
	res.send("404");
});

const port = process.env.PORT || 9999;
app.listen(port, function () {

	 console.log("Listen at port " + port);
  })
