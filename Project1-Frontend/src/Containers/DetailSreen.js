import React, { Component } from "react";
import axios from "../axios";
import { ROOT_API } from '../statics';
import LikeDisLike from "../Components/LikeDisLike";
import TextArea from "../Components/TextArea";
import NavBar from "../Components/NavBar";

class DetailScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false, ProductId: this.props.match.params.ProductId,
            loading: false
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidMount() {
        this.reloadPageBugScripts();
        this.getProduct();


    }
    getProduct = () => {
        axios
            .get(`${ROOT_API}/api/Products/${this.props.match.params.ProductId}`)
            .then(response => {
                console.log(response.data.product);

                this.setState({
                    Product: response.data.product,
                    ProductName: response.data.product.name,
                });
                axios
                    .put(`${ROOT_API}/api/Products/${this.props.match.params.ProductId}`, {
                        luotlike: response.data.product.like.length
                    }
                    )
                    .then(response => {
                        // this.setState({
                        //     Product: response.data.Product,

                        // });
                        // window.location.href = `http://localhost:3000/Products/${this.props.match.params.ProductId}`



                    })
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err));
    }

    reloadPageBugScripts = () => {
        const script = document.createElement("script");

        script.src = "/js/jquery-3.3.1.min.js";

        document.body.appendChild(script);
        const script1 = document.createElement("script");

        script1.src = "/js/jquery-migrate-3.0.1.min.js";

        document.body.appendChild(script1);
        const script2 = document.createElement("script");

        script2.src = "/js/jquery-ui.js";

        document.body.appendChild(script2);
        const script3 = document.createElement("script");

        script3.src = "/js/popper.min.js";

        document.body.appendChild(script3);
        const script4 = document.createElement("script");

        script4.src = "/js/bootstrap.min.js";

        document.body.appendChild(script4);
        const script5 = document.createElement("script");

        script5.src = "/js/owl.carousel.min.js";

        document.body.appendChild(script5);
        const script6 = document.createElement("script");

        script6.src = "/js/jquery.stellar.min.js";

        document.body.appendChild(script6);
        const script7 = document.createElement("script");

        script7.src = "/js/jquery.countdown.min.js";

        document.body.appendChild(script7);
        const script8 = document.createElement("script");

        script8.src = "/js/bootstrap-datepicker.min.js";

        document.body.appendChild(script8);
        const script9 = document.createElement("script");

        script9.src = "/js/jquery.easing.1.3.js";

        document.body.appendChild(script9);
        const script10 = document.createElement("script");

        script10.src = "/js/aos.js";

        document.body.appendChild(script10);
        const script11 = document.createElement("script");

        script11.src = "/js/jquery.fancybox.min.js";

        document.body.appendChild(script11);
        const script12 = document.createElement("script");

        script12.src = "/js/jquery.sticky.js";

        document.body.appendChild(script12);
        const script13 = document.createElement("script");

        script13.src = "/js/main.js";

        document.body.appendChild(script13);
    }
    _updateReview = (content) => {

        const Product = this.state.Product;
        let reviews = Product.review;
        reviews.push({
            user: { name: this.props.username },
            content: content
        });
        Product.reviews = reviews;
        this.setState({
            review: content
        })
    }

    addActor = (actor) => {
        this.setState({
            loading: true,

        });


        axios
            .put(`${ROOT_API}/api/Products/${this.props.match.params.ProductId}`, {
                actor: actor
            }
            )
            .then(response => {
                // this.setState({
                //     Product: response.data.Product,
                axios
                    .put(`${ROOT_API}/api/actors/${actor}`, {
                        Product: this.props.match.params.ProductId
                    }
                    )
                    .then(response => {


                        // window.location.href = `http://localhost:3000/Products/${this.props.match.params.ProductId}`



                    })
                    .catch(err => console.error(err));
                // });      

                if (response.data.success) {
                    this.setState({
                        visible: true,
                        loading: false
                    });

                    window.location.href = `/Products/${this.props.match.params.ProductId}`
                }




            })
            .catch(err => console.error(err));
    }
    addLike = (like) => {
        this.setState({
            loading: true
        })


        axios
            .put(`${ROOT_API}/api/Products/${this.props.match.params.ProductId}`, {
                like: like
            }
            )
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        visible: true,
                        loading: false
                    });

                    window.location.href = `/Products/${this.props.match.params.ProductId}`
                }




            })
            .catch(err => console.error(err));
    }
    onDismiss() {
        this.setState({ visible: false });
    }
    deleteCMT = (id, e) => {
        this.setState({
            loading: true
        })


        axios
            .delete(`${ROOT_API}/api/reviews/${id}`)
            .then(response => {
                if (response.data.success) {
                    const Product = this.state.Product;
                    let reviews = Product.review;
                    reviews.splice(e.target.value, 1);
                    Product.reviews = reviews;
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
        const { loading, Product } = this.state;
        var reviews = "";
        if (this.state.Product) {
            reviews = this.state.Product.review
                ? this.state.Product.review.map(review => (
                    <p className="review" key={review._id}>

                        <span style={{ color: "blue", fontWeight: "bold", fontSize: "20px" }} className="font-weight-bold">{
                            review.user ? review.user.name : ""
                        }</span> : {" "}
                        {review.content}
                        <a className="d-flex justify-content-end" onClick={(e) => this.deleteCMT(review._id, e)}>X</a>
                    </p>
                ))
                : "";
        }

        return (
            <div>
                <NavBar
                    ProductsWL={this.props.ProductsWL}
                    ProductsWLTotal={this.props.ProductsWLTotal}
                    onSearchChanged={this._onSearchChanged}
                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this.props.onCMTSignin}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                {this.state.Product ?
                    <div class="site-section bg-light" id="products-section">
                        <div class="container">
                            <div class="bg-white py-4 mb-4">


                                <div class="row mx-4 my-4 product-item-2 align-items-start">
                                    <div class="col-md-6 mb-5 mb-md-0">
                                        <img
                                            className="img-fluid"
                                            src={this.state.Product.image}
                                            alt={this.state.Product.name}
                                        />
                                    </div>
                                    <div class="col-md-5 ml-auto product-title-wrap">
                                        <span class="number"></span>
                                        <h3 class="text-black mb-4 font-weight-bold">{this.state.Product.name}</h3>
                                        <p class="mb-4">{this.state.Product.description}
                                        </p>
                                        <p class="mb-4">Ngày đăng: {this.state.Product.date.split("T").slice(0, 1)}
                                        </p>

                                        <p>{this.state.Product.address}</p>

                                        <div class="mb-4">
                                            <h3 class="text-black font-weight-bold h5">Giá:</h3>
                                            <div class="price">{this.state.Product.price}VNĐ
                                                </div>
                                        </div>
                                        <span className="meta-icons wishlist do">

                                            <i className="icon-heart mr-1">

                                            </i>
                                            <LikeDisLike
                                                Product={this.state.Product}
                                                addLike={this.addLike} />
                                        </span>

                                    </div>
                                    <div className="col-md-12 ml-auto product-title-wrap" ><h2>Review</h2><br /> {reviews}</div>
                                </div>


                                <TextArea
                                    username={this.props.username}
                                    onLogin={this.props.onLogin}
                                    ProductId={this.state.ProductId}
                                    review={this.state.review}
                                    Product={this.state.Product}
                                    updateReview={this._updateReview}
                                />
                            </div>
                        </div>
                    </div>
                    : ""}

            </div>

        );
    }
}

export default DetailScreen;