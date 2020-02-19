import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProfilePanel from "./ProfilePanel";
import SearchField from "./SearchField";
import ProductImage from "./ProductImage";
class NavBar extends Component {


    render() {

        const allProductImages =this.props.ProductsWL ? this.props.ProductsWL.map(Product => (
            <div key={Product._id} className="col-lg-3 col-md-6 mb-5">
                <Link to={`/Products/${Product._id}`}
                >
                    <ProductImage
                        
                        Product={Product}
                    />
                </Link>
            </div>

        )) :"";
        return (

            <header className="site-navbar py-4 bg-white js-sticky-header site-navbar-target" role="banner">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-6 col-xl-2">
                            <h1 className="mb-0 site-logo"><a className="text-black mb-0">Selling<span className="text-primary">.</span> </a></h1>
                        </div>
                        <div className="col-12 col-md-10 d-none d-xl-block">
                            <nav className="site-navigation position-relative text-right" role="navigation">

                                <ul id="nav" className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                                    <li><Link to={"/"} className="nav-link">Home</Link></li>
                                    <li>   <Link to={"/Product"} className="nav-link">Product</Link></li>
                                    <li><Link to={"/user"} className="nav-link">User</Link></li>
                                    <li>  <Link to={"/createNew"} className="nav-link">Add Product </Link></li>
                                    <li>   <Link to={"/SignUp"} className="nav-link">Register </Link></li>
                                    <li>  <SearchField onSearchChanged={this.props.onSearchChanged} /></li>
                                    <li id="notification_li">
                                        <a href="#" id="notificationLink">Notifications</a>
                                        <span id="notification_count">{this.props.ProductsWLTotal}</span>

                                        <div id="notificationContainer">
                                            <div id="notificationTitle">Notifications</div>
                                            <div id="notificationsBody" class="notifications">
                                                {allProductImages}


                                            </div>
                                            <div id="notificationFooter"><a href="#">See All</a></div>
                                        </div>

                                    </li>
                                    <li>   <ProfilePanel
                                        onNameSignin={this.props.onNameSignin}
                                        onCMTSignin={this.props.onCMTSignin}
                                        username={this.props.username}
                                        onLogin={this.props.onLogin}
                                    /></li>
                                </ul>
                            </nav>
                        </div>



                    </div>
                </div>

            </header>

        );
    }
}

export default NavBar;