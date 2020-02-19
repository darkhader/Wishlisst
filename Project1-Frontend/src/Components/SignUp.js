import React, { Component } from 'react';
import { ROOT_API } from '../statics';
import axios from "../axios";
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import NavBar from "../Components/NavBar";
import Loading from "./Loading";
class SignUp extends Component {

    state = {
        name: '',
        email: '',
        hashPassword: '',
        avatar: '',
        address: '',
        review: [],
        phone: '',
        loading: false
    }
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
    }
    handleSubmit = (event) => {
        this.setState({
            loading: true,

        });


        event.preventDefault();
        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            avatar: this.state.avatar,
            address: this.state.address,
            phone: this.state.phone,
            review: this.state.review
        }
        axios
            .post(`${ROOT_API}/api/users`, userData)
            .then(response => {

                if (response.data.success) {

                    this.setState({
                        visible: true,
                        loading: false
                    });
                    window.location.href = "/";
                }
            })
            .catch(err => console.log(err))
    }

    handleInputChange = async (event) => {


        if (event.target.files) {


            const request = new XMLHttpRequest()
            const formData = new FormData()
            const file = event.target.files[0];
            var u;

            formData.append('image', file)

            request.open('POST', 'https://api.imgur.com/3/image/', false)
            request.setRequestHeader('Authorization', `Client-ID 4f9e5337ed520ef`)
            request.onreadystatechange = () => {
                if (request.status === 200 && request.readyState === 4) {
                    let res = JSON.parse(request.responseText);
                    u = `https://i.imgur.com/${res.data.id}.png`;

                    this.setState({
                        avatar: u
                    })
                }
            }

            await request.send(formData)
        } else
            this.setState({
                [event.target.name]: event.target.value
            })
    }

    render() {
        const { loading } = this.state;
        const style ={
            color: ' #e6e6e6'
        }
        return (
            <div>

                <NavBar
                    onSearchChanged={this._onSearchChanged}
                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this.props.onCMTSignin}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                {loading ? <div className="text-center"><Loading /></div>
                    :
                    <div className="site-section" >
                        <Container>

                            <h3 style={style} className="mt-2 ml-2">Add user Information: </h3>
                            <Form className="mt-2" onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label>Name: </Label>
                                    <Input name="name" placeholder="Enter name" onChange={this.handleInputChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email: </Label>
                                    <Input name="email" placeholder="Enter email" onChange={this.handleInputChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Password: </Label>
                                    <Input name="password" type="text" placeholder="Enter pass" onChange={this.handleInputChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Address: </Label>
                                    <Input name="address" type="text" placeholder="Your Location" onChange={this.handleInputChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Avatar: </Label>
                                    <Input name="files" type="file" className="input-image" onChange={this.handleInputChange} placeholder="Enter a link" />
                                </FormGroup>
                                <div className="d-flex justify-content-center">
                                    <Button color="primary">Submit</Button>
                                </div>
                            </Form>
                        </Container>
                    </div>
                }
            </div>
        );
    }
}

export default SignUp;