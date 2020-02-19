import React, { Component } from "react";
import ProductImage from "./ProductImage";
import UseState from "./ProductImage";
import { Link } from "react-router-dom";


class MainContent extends Component {
    componentDidMount() {
        this.props.reloadPageBugScripts;
    }


    render() {
        const { addActor, addLike } = this.props;

        const allProductImages =this.props.Products ? this.props.Products.map(Product => (
            <div key={Product._id} className="col-lg-4 col-md-6 mb-5">
                <Link to={`/Products/${Product._id}`}
                >
                    <ProductImage
                        hiddenReview={true}
                        addActor={addActor}
                        addLike={addLike}
                        Product={Product}
                        reloadPageBugScripts={this.props.reloadPageBugScripts} />
                </Link>
            </div>

        )): "";

        return (
            <div className="container main_content">
                <div className="row">{allProductImages}</div>
            </div>
        );
    }
}

export default MainContent;