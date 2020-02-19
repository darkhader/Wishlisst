import React, { Component } from "react";

import { ROOT_API } from '../statics';
import axios from "../axios";
import '../App.css';
import { Link } from "react-router-dom";
class ProductInActor extends Component {
    state = {
        Product: "",
        Products: []
    }
    componentDidMount() {
        axios
            .get(`${ROOT_API}/api/Products/`)
            .then(data => {
                this.setState({
                    Products: data.data.Products
                });


            })
            .catch(err => console.error(err));



    }
    render() {









        const Products = this.props.actor.Product
            ? this.props.actor.Product.map(Product => (

                this.props.hiddenReview ? "" :
                    <li className="col-3" key={Product._id}>
                        <Link to={`/Products/${Product._id}`}>
                          

                        

                        <img src={Product.image}
                            style={{ width: "95px", height:"140px" }}
                            className="img-fluid"
                        ></img>
                        </Link>
                    </li>
            ))
            : "";




        // this.props.addActor( this.state.actor);

        return (
            this.props.hiddenReview ? "" :
                <div className="container">
                <h2>Phim đã đóng</h2>
                    <ul className="Product_image row" style={{width: "1050", height: "200px", overflow:" auto"}}>
                        {Products}
                    </ul>

                </div>


        );
    }
}

export default ProductInActor;