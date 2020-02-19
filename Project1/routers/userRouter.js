const express = require('express');
const UserRouter = express.Router();
const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt-nodejs')

// Middleware

UserRouter.post("/", async (req, res) => {
	console.log(req.body)
	const { name, email, password, avatar, address } = req.body;
	const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync())
	try {
		const userCreated = await UserModel.create({ name, email, hashPassword, avatar, address });
		res.status(201).json({ success: 1, user: userCreated });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});


// UserRouter.use((req,res,next)=> {
// 	const{userInfo}=req.session;
// 	if(userInfo && userInfo.role >=1){
// 		next();
// 	} else res.status(404).json({ success: 0, message: "Ko du tuoi" });
// })


// UserRouter.use((req, res, next) => {
// 	console.log("User middleware");
// 	next();
// });
// "/api/users" => get all
UserRouter.get("/", async (req, res) => {
	console.log("Get all users");
	var perPage = 8
	var page = req.query.page || 1;
	var sort = req.query.sort || 1;


	try {
		if (sort == 0) {
			const users = await UserModel.find({})


			const total = await UserModel.count({});
			res.json({ success: 1, users, total });
		}
		if (sort == 1) {
			const users = await UserModel.find({})
				.skip(perPage * (page - 1))
				.limit(perPage).sort([['name', 1]]);


			const total = await UserModel.count({});
			res.json({ success: 1, users, total });
		}
		if (sort == 2) {
			const users = await UserModel.find({})
				.skip(perPage * (page - 1))
				.limit(perPage).sort([['luotlike', 1]]);


			const total = await UserModel.count({});
			res.json({ success: 1, users, total });
		}
	} catch (error) {
		res.status(500).json({ success: 0, error: error })
	}

});

// get user by id
UserRouter.get("/:id", async (req, res) => {
	let userId = req.params.id;
	try {
		const userFound = await UserModel.findById(userId);
		if (!userFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, user: userFound });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});
UserRouter.get("/wishlish/:id", async (req, res) => {
	let userId = req.params.id;
	try {
		var keyWords, total;
		const userFound = await UserModel.findById(userId);

		// tim product(co the dung promise)
		await userFound.keyWord.forEach(async function (wlKeyWord) {

			console.log("wlKeyWord", wlKeyWord);

			keyWords = await ProductModel.find({ 'description': new RegExp(wlKeyWord, 'i') }, function (err, results) {
				if (err) { }
				if (results.length >0 ) {
					total = results.length;
				}
			});


		});
		setTimeout(function () {
			if (!keyWords) res.status(404).json({ success: 0, message: "Not found!" })
			if (keyWords)


				res.json({ success: 1, user: keyWords ,total});
		}, 3000)



	} catch (error) {
		console.log("error", error);
		res.status(500).json({ success: 0, message: error })
	}
});
// Create user


// Edit user
UserRouter.put("/:id", async (req, res) => {
	const userId = req.params.id;
	const { name, password, avatar, address, review, keyWord, selluser, luotlike } = req.body;
	const m = 0;
	const n = 0;
	try {
		const userFound = await UserModel.findById(userId);
		if (!userFound) {
			res.status(404).json({ success: 0, message: "Not found!" });
		} else {
			for (key in { name, password, avatar, address, keyWord }) {
				if (userFound["hashPassword"] && req.body["password"]) {
					const plainPassword = req.body["password"];
					const hashPassword = userFound["hashPassword"];
					if (!bcrypt.compareSync(plainPassword, hashPassword)) {
						userFound["hashPassword"] = bcrypt.hashSync(plainPassword, bcrypt.genSaltSync())
					}
				}
				else if (userFound[key] && req.body[key]) userFound[key] = req.body[key];
			}
			let userUpdated = await userFound.save();
			res.json({ success: 1, user: userUpdated });
		}


		if (selluser) {
			for (let i = 0; i < userFound.selluser.length; i++) {

				if (selluser == userFound.selluser[i]) {

					m = 1;

				}

			}
			if (m == 0) {
				const userFound = await UserModel.findByIdAndUpdate(userId, { $push: { selluser: selluser } })
				let userUpdated = await userFound.save();
				res.json({ success: 1, user: userUpdated });
			}

		}
		if (luotlike) {
			const userFound = await UserModel.findByIdAndUpdate(userId, { luotlike })
			let userUpdated = await userFound.save();
			res.json({ success: 1, user: userUpdated });
		}
		if (review) {
			const userFound = await UserModel.findByIdAndUpdate(userId, { $push: { review: review } })
			let userUpdated = await userFound.save();
			res.json({ success: 1, user: userUpdated });
		}
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

// Delete user => BTVN
UserRouter.delete("/:id", async (req, res) => {
	const userId = req.params.id;
	try {
		UserModel.remove({ _id: userId });
		res.json({ success: 1 });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

module.exports = UserRouter;