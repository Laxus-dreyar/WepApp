import React, {Component} from 'react';
import axios from 'axios';

export default class ProdList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            username: this.props.location.user
        }
    }

    componentDidMount() {
        const newProduct = {
            username: this.state.username,
            name: '',
            Price: 0,
            Quantity: 0
        };

        axios.post('http://localhost:4000/login/customer/products',newProduct)
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    editProduct = (username,quantity1,count1,productname) => {
        this.props.history.push({
            pathname:'/login/customer/products-edit',
            user: this.state.username,
            name: productname,
            vendorname: username,
            quantity: quantity1,
            count: count1
        });
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vendor name</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Quantity Left</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td>{currentUser.vendorname}</td>
                                    <td>{currentUser.productname}</td>
                                    <td>{currentUser.quantity}</td>
                                    <td>{currentUser.count}</td>
                                    <td>{currentUser.status}</td>
                                    <td><button type="button" onClick={() => this.editProduct(currentUser.vendorname,currentUser.quantity,currentUser.count,currentUser.productname)}>Edit</button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}