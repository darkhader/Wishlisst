import React, { Component } from 'react';
import axios from "../axios";
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import "../App.css";
import { ROOT_API } from '../statics';
import NavBar from "./NavBar";
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            image: '',
            address: '',
            seller: '',
            price: '',
            review: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
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
        event.preventDefault();
        const ProductData = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
            review: this.state.review
        }

        //required




        axios
            .post(`${ROOT_API}/api/Products`, ProductData)
            .then(response => {

                if (response.data.success) {
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
                        image: u
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
        const style = {
            color: ' #e6e6e6'
        }
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
                <div className="site-section" >
                    <Container>
                        <h3 style={style} className="col-12 d-flex justify-content-center">Add New Product's Information: </h3>
                        <Form className="row32 col-6 " onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label>Product's Name: </Label>
                                <Input name="name" placeholder="Enter title" onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description: </Label>
                                <Input name="description" placeholder="tell me" onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label> Image: </Label>
                                <Input type="file" className="input-image" onChange={this.handleInputChange} placeholder="Enter a link" />
                            </FormGroup>

                            <FormGroup>
                                <Label>Price: </Label>
                                <Input name="price" type="text" onChange={this.handleInputChange} />
                            </FormGroup>

                            <div className="d-flex justify-content-center">
                                <Button color="primary">Submit</Button>
                            </div>
                        </Form>
                    </Container>
                </div>
            </div >
        );
    }
}

export default AddProduct;  