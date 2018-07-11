import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component{
    state={
        name : '',
        email : '',
        address : {
            street: '',
            postalCode : ''
        },
        loading : false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        // alert("You continue the purchase");
        this.setState({loading:true})
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            address : {
                street : 'Teststreet1',
                zipcode : '123654',
                country : 'India'
            }
        }
        //.json is a special requirement for firebase
        axios.post('/orders.json',order)
        .then((response)=>{this.setState({loading : false})
        this.props.history.push('/');})
        .catch((error)=>{this.setState({loading : false})});
    }
    render(){
        let form = <form>
            <input className={classes.Input} type="text" placeholder="Enter Name" name="name" />
            <input className={classes.Input} type="email" placeholder="Enter Mail" name="email" />
            <input className={classes.Input} type="text" placeholder="Enter Street" name="street" />
            <input className={classes.Input} type="text" placeholder="Enter Postal Code" name="postal" />
            <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;