import React, { Component } from "react";
import '../App.css';
import axios from "../axios";
import { ROOT_API } from '../statics';

class LikeDisLike extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userlike: ""
        }
    }

    _onClick = (event) => {


        event.preventDefault();
        axios({
            url: `${ROOT_API}/api/auth`,
            method: "GET",

        }).then(response => {

            if (response) {
                this.setState({
                    userlike: response.data.userFound.id

                })
                let m = 0;
                for (let i = 0; i < this.props.user.like.length; i++) {
                    if (this.state.userlike === this.props.user.like[i]) {
                        m = 1;
                    }
                    if (this.state.userlike !== this.props.user.like[i]) {
                        m = 0;
                    }
                  

                }
          

                if (m === 0) {
                    this.props.addLike(this.state.userlike)
                }

           
            }


        }).catch(error => {

            console.log(error)


        });


    }


    render() {


        return (


            <div className="like">



                <button onClick={this._onClick} type="button" class="btn btn-info">
                    <span class="glyphicon glyphicon-triangle-top"></span>
                </button>
                <span>          {this.props.user.like.length}</span>


            </div>





        )

    };
}


export default LikeDisLike;