import React, { Component } from "react";

import axios from "../axios";
import { ROOT_API } from '../statics';
import Page from "../Components/Page";
import Sort from "../Components/Sort";
import NavBar from "../Components/NavBar";
import UserContent from "../Components/UserContent";

class UserScreen extends Component {
    state = {
        users: [],
        searchString: "",
        pageNumber: 1,
        sortNumber: 1,
        total: 0
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
            .get(`${ROOT_API}/api/users?page=${this.state.pageNumber}&sort=${this.state.sortNumber}`)
            .then(response => {

                this.setState({
                    users: response.data.users,
                    total: response.data.total
                });
            })
            .catch(err => console.error(err));
    }
    changePage = (pageNumber) => {
        axios
            .get(`${ROOT_API}/api/users?page=${pageNumber}&sort=${this.state.sortNumber}`)
            .then(response => {
                this.setState({
                    users: response.data.users,
                    pageNumber
                });
            })
            .catch(err => console.error(err));
    }
    changeSort = (sortNumber) => {
        axios
            .get(`${ROOT_API}/api/users?page=${this.state.pageNumber}&sort=${sortNumber}`)
            .then(response => {
                this.setState({
                    users: response.data.users,
                    sortNumber
                });


            })
            .catch(err => console.error(err));
    }
    _onSearchChanged = text => this.setState({ searchString: text });

    render() {
        const displayeduserImages = this.state.users.filter(
            user =>

                user.name.toLowerCase().includes(this.state.searchString)
                ||
                user.address.toLowerCase().includes(this.state.searchString)
        );


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
                <div className="site-section" id="users-section">
                    <Sort changeSort={this.changeSort} />
                    <UserContent users={displayeduserImages} />
                    <Page
                        total={this.state.total}
                        currentPage={this.state.pageNumber} changePage={this.changePage} />
                </div>

            </div>
        );
    }
}

export default UserScreen;