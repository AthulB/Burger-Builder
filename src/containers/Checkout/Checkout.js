import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends Component {


    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    //for getting params through url search string
    // componentWillMount(){
        
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;
        // for (let param of query.entries()){
        //     //['salad','1']   + to convert it into number
        //     if(param[0]==="price"){
        //         price = param[1];
        //     }else{
        //         ingredients[param[0]] = +param[1];
        //     }
            
        // }
        // this.setState({ingredients : ingredients ,totalPrice : price})
    // }

    render(){
        return(
            <div>
                <CheckoutSummary
                checkoutCancelled={this.checkoutCancelHandler}
                checkoutContinued={this.checkoutContinueHandler}
                ingredients={this.props.ings}/>
                <Route path={this.props.match.path + "/contact-data"} 
                component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);