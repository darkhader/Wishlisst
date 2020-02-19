import React, { Component } from 'react'
import axios from "../axios";
import { ROOT_API } from '../statics';
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
export default class Home extends Component {
    state = {
        reviews: []
    }
    componentDidMount() {
        this.reloadPageBugScripts();
        axios
            .get(`${ROOT_API}/api/reviews`, {

            }
            )
            .then(response => {
                this.setState({
                    reviews: response.data.reviews


                });



            })
            .catch(err => console.error(err))
      
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
    render() {



        const reviewsProduct = this.state.reviews
            ? this.state.reviews.map(review => (




                <li className="col-5" key={review._id}>{
                    review.Product ? <Link to={`/Products/${review.Product}`}>


                        <p>{review.username} đã viết bài Review ở phim {review.Producttitle}</p>


                    </Link> : ""
                }


                </li>
            ))
            : "";
        const reviewsActor = this.state.reviews
            ? this.state.reviews.map(review => (




                <li className="col-5" key={review._id}>
                    {
                        review.actor ?
                            <Link to={`/actors/${review.actor}`}>
                                <p>{review.username} đã viết bài Review ở diễn viên {review.actorname}</p>




                            </Link> : ""
                    }

                </li>
            ))
            : "";
        return (
            <div >
                <NavBar
                    ProductsWL={this.props.ProductsWL}
                    ProductsWLTotal={this.props.ProductsWLTotal}
                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this.props.onCMTSignin}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                <h2>Các Reviews</h2>
                <ul className="reviewhome " style={{ width: "700px", height: "500px", overflow: " auto", textAlign: "center" }}>
                    {reviewsProduct}
                    {reviewsActor}
                </ul>

            </div>
        )
    }
}
