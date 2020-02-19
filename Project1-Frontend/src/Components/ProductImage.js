import React, { Component } from "react";
import axios from "../axios";
import { ROOT_API } from '../statics';
// import ActorInProduct from "./ActorInProduct";
import LikeDisLike from "./LikeDisLike";
import Trailer from "./Trailer";
class ProductImage extends Component {

    componentDidMount() {

        axios({
            url: `${ROOT_API}/api/Products/${this.props.ProductId}`,
            method: "GET",

        }).then(response => {
        }).catch(error => {
            console.log(error)
        });

    }

    render() {


        const reviews = this.props.Product.review
            ? this.props.Product.review.map(review => (
                <p className="review" key={review._id}>

                    <span style={{ color: "pink", fontWeight: "bold", fontSize: "20px" }} className="font-weight-bold">{
                        review.user ? review.user.name : ""
                    }</span> : {" "}
                    {review.content}
                </p>
            ))
            : "";


        return (






            <div className="product-item">
                <figure>
                    <img
                        className="img-fluid text-center"
                        src={this.props.Product.image}
                        alt={this.props.Product.name}
                    />
                </figure>
                <div className="mb-3 ">
                    <span className="meta-icons mr-3 vang ">

                        <span className="icon-star text-warning mr-1">

                        </span>
                        Giá: {this.props.Product.price}VNĐ
                    </span>
                    <span className="meta-icons wishlist do">

                        <i className="icon-heart mr-1 do">

                        </i>
                        <LikeDisLike
                            hiddenReview={this.props.hiddenReview}
                            Product={this.props.Product}
                            addLike={this.props.addLike} />
                    </span>
                </div>

                <div className="px-4">
                    <h3 className="d-flex align-items-center">{this.props.Product.name} </h3>
                    <span>{this.props.Product.address}</span>
                    <p className="mb-4 tukhoa">Từ khóa:  {this.props.Product.description}</p>
                    <Trailer
                        hiddenReview={this.props.hiddenReview}
                        title={this.props.Product.name} />


                    {this.props.hiddenReview ? "" : <p ><h2>Review</h2><br /> {reviews}</p>}
                </div>


            </div>
        );
    }
}

export default ProductImage;