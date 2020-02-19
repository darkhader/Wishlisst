const express = require('express');
const ProductRouter = express.Router();
const ProductModel = require('../models/productModel');

// Middleware




ProductRouter.get("/", async (req, res) => {
	console.log("Get all products");
	var perPage = 8
	var page = req.query.page || 1;
	var sort = req.query.sort || 1;


	try {

		if (sort == 1) {
			const products = await ProductModel.find({})
				.skip(perPage * (page - 1))
				.limit(perPage).sort([['name', 1]]);

console.log(products);

			const total = await ProductModel.count({});
			res.json({ success: 1, products, total });
		}
		if (sort == 2) {
			const products = await ProductModel.find({})
				.skip(perPage * (page - 1))
				.limit(perPage).sort([['price', 1]]);


			const total = await ProductModel.count({});
			res.json({ success: 1, products, total });
		}
		if (sort == 3) {
			const products = await ProductModel.find({})
				.skip(perPage * (page - 1))
				.limit(perPage).sort([["like", -1]]);


			const total = await ProductModel.count({});
			res.json({ success: 1, products, total });
		}
		if (sort == 4) {
			const products = await ProductModel.find({})
				.skip(perPage * (page - 1))
				.limit(perPage).sort({ date: -1 });


			const total = await ProductModel.count({});
			res.json({ success: 1, products, total });
		}
	} catch (error) {
		res.status(500).json({ success: 0, error: error })
	}

});

// get user by id
ProductRouter.get("/:id", async (req, res) => {
	let productId = req.params.id;
	try {
		const productFound = await ProductModel.findById(productId)
			.populate("User", "name")
			.populate({
				path: "review",
				select: "content user",
				populate: {
					path: "user",
					model: "User"
				}
			});
		if (!productFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, product: productFound });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});


ProductRouter.use((req, res, next) => {
	
	const { userFound } = req.session;
	if (userFound && userFound.role >= 1) {
		next();
	} else res.status(401).json({ success: 0, message: userFound });
})
// Create user

ProductRouter.post("/", async (req, res) => {
	const { userFound } = req.session;
	const { name, description, image, price } = req.body;
	const seller = userFound.name;
	const address = userFound.address
	try {
		const productCreated = await ProductModel.create({ name, description, image,address, price, seller });
		res.status(201).json({ success: 1, product: productCreated, productId: productCreated._id });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});
// Edit user
ProductRouter.put("/:id", async (req, res) => {
	const productId = req.params.id;
	const { seller, like, luotlike, review } = req.body;
	const productFound1 = await ProductModel.findById(productId);
	const m = 0;
	const n = 0;
	try {
		if (seller) {
			for (let i = 0; i < productFound1.actor.length; i++) {

				if (actor == productFound1.actor[i]) {

					m = 1;

				}

			}
			if (m == 0) {
				const productFound = await ProductModel.findByIdAndUpdate(productId, { $push: { actor: actor } })
				let productUpdated = await productFound.save();
				res.json({ success: 1, user: productUpdated });
			}

		}
		if (like) {
			for (let i = 0; i < productFound1.like.length; i++) {

				if (like == productFound1.like[i]) {

					n = 1;

				}

			}
			if (n == 0) {
				const productFound = await ProductModel.findByIdAndUpdate(productId, { $push: { like: like } })
				let productUpdated = await productFound.save();
				res.json({ success: 1, user: productUpdated });
			}

		}
		if (review) {
			const productFound = await ProductModel.findByIdAndUpdate(productId, { $push: { review: review } })
			let productUpdated = await productFound.save();
			res.json({ success: 1, user: productUpdated });
		}




	} catch (error) {
		res.status(500).json({ success: 0, messageloi: error })
	}
});





ProductRouter.delete("/:id", (req, res) => {
	const productId = req.params.id;
	ProductRouter.remove({ _id: productId }, (err) => {
		if (err) res.status(500).json({ success: 0, message: err })
		else res.json({ success: 1 });
	});
});

module.exports = ProductRouter;