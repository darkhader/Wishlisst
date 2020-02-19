const express = require('express');
const ReviewRouter = express.Router();
const ReviewModel = require('../models/reviewModel');
const productModel = require('../models/productModel');
const UserModel = require('../models/userModel')

ReviewRouter.get("/", async(req, res) => {
    console.log();

    try {
        const reviews = await ReviewModel.find({}).sort([
            ['createdAt', -1]
        ]);
        res.json({ success: 1, reviews });
    } catch (error) {
        res.status(500).json({ success: 0, error: error })
    }

});

// get user by id
ReviewRouter.get("/:id", async(req, res) => {
    let reviewId = req.params.id;
    try {
        const reviewFound = await reviewModel.findById(reviewId);
        if (!reviewFound) res.status(404).json({ success: 0, message: "Not found!" })
        else res.json({ success: 1, review: reviewFound });
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

ReviewRouter.post("/", async(req, res) => {


    const { content, product, user, username, name, userCmt } = req.body;

    try {
        if (product) {
            const reviewCreated = await ReviewModel.create({ content, product, user, username, name });
            await productModel.findByIdAndUpdate(product, { $push: { review: reviewCreated._id } })
            await UserModel.findByIdAndUpdate(user, { $set: { user: reviewCreated._id } })
            res.status(201).json({ success: 1, review: reviewCreated, reviewId: reviewCreated._id });
        }
        if (userCmt) {
            const reviewCreated = await ReviewModel.create({ content, userCmt, user, username, name });
            await UserModel.findByIdAndUpdate(userCmt, { $push: { review: reviewCreated._id } })
            await UserModel.findByIdAndUpdate(user, { $set: { user: reviewCreated._id } })
            res.status(201).json({ success: 1, review: reviewCreated, reviewId: reviewCreated._id });
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }

});

ReviewRouter.put("/:id", async(req, res) => {
  
});
ReviewRouter.use((req, res, next) => {
	
    const { userFound } = req.session;
    console.log('chao ad',userFound);
  
	if (userFound && userFound.role >= 2) {
		next();
	} else res.status(401).json({ success: 0, message: userFound });
})
// Delete user => BTVN
ReviewRouter.delete("/:id", async(req, res) => {
    const id = req.params.id;
    console.log("id",id);
    
    try {
        ReviewModel.remove({ _id: id }).exec();
        res.json({ success: 1 });
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

module.exports = ReviewRouter;