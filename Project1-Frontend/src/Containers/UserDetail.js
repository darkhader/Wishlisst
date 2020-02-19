import React, { Component } from "react";
import axios from "../axios";
import { ROOT_API } from '../statics';
import NavBar from "../Components/NavBar";
import TextAreaUser from "../Components/TextAreaUser";
import UserImage from "../Components/UserImage";

class userDetail extends Component {
    state = {
        userId: this.props.match.params.userId
    };

    componentDidMount() {
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

        axios
            .get(`${ROOT_API}/api/users/${this.props.match.params.userId}`)
            .then(response => {


                this.setState({
                    user: response.data.user,
                    username: response.data.user.name,

                });
                axios
                    .put(`${ROOT_API}/api/users/${this.props.match.params.userId}`, {
                        luotlike: response.data.user.like.length
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

    _updateReview = (content) => {

        const user = this.state.user;
        let reviews = user.review;
        reviews.push({
            user: { name: this.props.username },
            content: content
        });
        user.reviews = reviews;
        this.setState({
            review: content
        })
    }


    addLike = (like) => {


        axios
            .put(`${ROOT_API}/api/users/${this.props.match.params.userId}`, {
                like: like
            }
            )
            .then(response => {

                window.location.href = `http://imdb-frontend.herokuapp.com/users/${this.props.match.params.userId}`



            })
            .catch(err => console.error(err));
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
                <div className="site-section main_content container">
                    <div className="row">
                        <div className="col-6 mr-auto ml-auto">
                            {this.state.user ?
                                <UserImage

                                    addLike={this.addLike}
                                    userId={this.state.userId}
                                    user={this.state.user}
                                    username={this.props.username}
                                    onLogin={this.props.onLogin}
                                />
                                : ""}
                            <TextAreaUser
                                username={this.props.username}
                                onLogin={this.props.onLogin}
                                userId={this.state.userId}
                                review={this.state.review}
                                user={this.props.user}
                                updateReview={this._updateReview} />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default userDetail;