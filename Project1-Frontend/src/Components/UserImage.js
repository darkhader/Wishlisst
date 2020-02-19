import React, { Component } from "react";
import LikeUser from "./LikeUser";
import { ROOT_API } from '../statics';
import axios from "../axios";
// import ProductInuser from "./ProductInuser";
class UserImage extends Component {
    componentDidMount() {

        axios({
            url: `${ROOT_API}/api/users/${this.props.userId}`,
            method: "GET",

        }).then(response => {
        }).catch(error => {
            console.log(error)
        });

    }
    deleteCMT = (id, e) => {
        this.setState({
            loading: true
        })


        axios
            .delete(`${ROOT_API}/api/reviews/${id}`)
            .then(response => {
                if (response.data.success) {
                    const user = this.props.user;
                    let reviews = user.review;
                    reviews.splice(e.target.value, 1);
                    user.reviews = reviews;
                    this.setState({
                        visible: true,
                        loading: false,
                        review: reviews
                    });


                    console.log(response.data);


                }




            })
            .catch(err => console.error(err));
    }
    render() {
        const reviews = this.props.user.review
            ? this.props.user.review.map(review => (
                <p className="review" key={review._id}>

                    <span style={{ color: "pink", fontWeight: "bold", fontSize: "20px" }} className="font-weight-bold">{
                        review.user ? review.user.name : ""
                    }</span>:{" "}
                    {review.content}
                    <a className="d-flex justify-content-end" onClick={(e) => this.deleteCMT(review._id, e)}>X</a>
                </p>
            ))
            : "";

        return (

            <div className="product-item">
                <figure>
                    <img
                        className="img-fluid"
                        src={this.props.user.avatar}
                        alt={this.props.user.name}
                    />
                </figure>
                <div className="mb-3">
                    <span className="meta-icons mr-3 vang">

                        <span className="icon-star text-warning mr-1">

                        </span>
                        {this.props.user.dob}
                    </span>
                    <span className="meta-icons wishlist do">

                        <i className="icon-heart mr-1 do">

                        </i>
                        <LikeUser hiddenReview={this.props.hiddenReview}
                            user={this.props.user}
                            addLike={this.props.addLike} />
                    </span>
                </div>

                <div className="px-4">
                    <h3 className="d-flex align-items-center">{this.props.user.name} </h3>

                    <p className="mb-4 tukhoa">Quốc gia: {this.props.user.nationality}</p>
                    {this.props.hiddenReview ? "" : <p><h2>Review</h2>
                        <br /> {reviews}
                    </p>}



                </div>


            </div>







        );
    }
}

export default UserImage;