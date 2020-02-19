import React, { Component } from "react";
import UserImage from "./UserImage";

import { Link } from "react-router-dom";

class UserContent extends Component {
    render() {
        const { addLike } = this.props;
        const alluserImages = this.props.users.map(user => (
            <div key={user._id} className="col-lg-4 col-md-6 mb-5">
                <Link to={`/users/${user._id}`}>
                    <UserImage 
                    hiddenReview={true}
                    user={user}
                    addLike={addLike} />
                </Link>
            </div>
        ));

        return (
            <div className="container user_content">
                <div className="row">{alluserImages}</div>
            </div>
        );
    }
}

export default UserContent;