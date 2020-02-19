import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import axios from "./axios";
import HomeScreen from "./Containers/HomeScreen";
import DetailScreen from "./Containers/DetailSreen";
import UserScreen from "./Containers/UserScreen";
import { ROOT_API } from './statics';
import { BrowserRouter, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import AddProduct from "./Components/AddProduct";
import UserDetail from "./Containers/UserDetail";
import Home from "./Containers/Home";



class App extends Component {
    state = {};

    _onLogin = () => {
        axios({
            url: `${ROOT_API}/api/auth/login`,
            method: "POST",
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(response => {


            if (response.data.success) {
                this.setState({
                    username: response.data.userFound.name,
                    userId: response.data.userFound._id,

                })


            }

        }).catch(error => {

            console.log(error)


        });
    };

    _onNameSignin = text => this.setState({ email: text });
    _onCMTSignin = text => this.setState({ password: text });
    componentDidMount() {
        this.interval = setInterval(() => {
            axios
                .get(`${ROOT_API}/api/auth`, {

                }
                )
                .then(response => {

                    axios
                        .get(`${ROOT_API}/api/users/wishlish/` + response.data.userFound.id, {

                        }
                        )
                        .then(response => {
                            console.log("res", response);

                            if (response.data.success) {
                                this.setState({
                                    ProductsWL: response.data.user,
                                    ProductsWLTotal: response.data.total,
                                });


                            }
                        })
                        .catch(err => console.error(err))



                })
                .catch(err => console.error(err))
        }, 5000);

    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        var self = this;
        if (self.state.status === 'start') {
            self.state.status = 'loading';
            setTimeout(function () {
                self.do_load()
            }, 0);
        }

        console.log(this.state.ProductsWL);

        return (
            <div className="site-wrap">

                <BrowserRouter>
                    <div className="App ">

                        <Route
                            exact
                            path="/"
                            render={() => {

                                return (
                                    <Home onSearchChanged={this._onSearchChanged}
                                        onNameSignin={this._onNameSignin}
                                        onCMTSignin={this._onCMTSignin}
                                        username={this.state.username}
                                        onLogin={this._onLogin}
                                        userId={this.state.userId}
                                        ProductsWL={this.state.ProductsWL} 
                                        ProductsWLTotal={this.state.ProductsWLTotal} />
                                );

                            }}
                        />
                        <Route
                            path="/Product"
                            render={props => {
                                return <HomeScreen
                                    {...props}
                                    onSearchChanged={this.state.searchString}
                                    onNameSignin={this._onNameSignin}
                                    onCMTSignin={this._onCMTSignin}
                                    username={this.state.username}
                                    onLogin={this._onLogin}
                                    ProductsWL={this.state.ProductsWL}
                                    ProductsWLTotal={this.state.ProductsWLTotal}
                                />;
                            }}
                        />

                        <Route
                            path="/Products/:ProductId"
                            onChange={this.reloadPageBugScripts}
                            render={props => {
                                return <DetailScreen
                                    {...props}
                                    onNameSignin={this._onNameSignin}
                                    onCMTSignin={this._onCMTSignin}
                                    username={this.state.username}
                                    onLogin={this._onLogin}
                                    reloadPageBugScripts={this.reloadPageBugScripts}
                                    ProductsWL={this.state.ProductsWL}
                                    ProductsWLTotal={this.state.ProductsWLTotal}
                                />;
                            }}
                        />
                        <Route
                            path="/User"
                            render={props => {
                                return <UserScreen
                                    {...props}
                                    onNameSignin={this._onNameSignin}
                                    onCMTSignin={this._onCMTSignin}
                                    username={this.state.username}
                                    onLogin={this._onLogin}
                                    ProductsWL={this.state.ProductsWL}
                                    ProductsWLTotal={this.state.ProductsWLTotal}
                                />;
                            }}
                        />
                        <Route
                            path="/users/:userId"
                            render={props => {
                                return <UserDetail
                                    {...props}
                                    onNameSignin={this._onNameSignin}
                                    onCMTSignin={this._onCMTSignin}
                                    username={this.state.username}
                                    onLogin={this._onLogin}
                                    ProductsWL={this.state.ProductsWL}
                                    ProductsWLTotal={this.state.ProductsWLTotal}
                                />;
                            }}
                        />
                        <Route
                            path="/createNew"
                            render={props => {
                                return <AddProduct {...props}
                                    onNameSignin={this._onNameSignin}
                                    onCMTSignin={this._onCMTSignin}
                                    username={this.state.username}
                                    onLogin={this._onLogin}
                                    ProductsWL={this.state.ProductsWL}
                                    ProductsWLTotal={this.state.ProductsWLTotal}

                                />
                            }}
                        />

                        <Route
                            path="/SignUp"
                            render={props => {
                                return <SignUp {...props}
                                    onNameSignin={this._onNameSignin}
                                    onCMTSignin={this._onCMTSignin}
                                    username={this.state.username}
                                    onLogin={this._onLogin}

                                />
                            }}
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;