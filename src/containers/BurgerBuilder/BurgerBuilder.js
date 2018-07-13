import React,{ Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuidControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

const IngredientsPrice = {
    salad:0.4,
    meat:1.3,
    bacon:0.7,
    cheese:0.5
}

class BurgerBuilder extends Component {
    
    state ={
            purchasing:false,
            loading : false,
    }

    componentWillMount(){
        // axios.get('/ingredients.json')
        //     .then(response=>{
        //         this.setState({ingredients:response.data})
        //     })
        //     .catch(error=>{
        //         this.setState({error:true})
        //     })
    }
    
    updatePurchaseInfo(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        },0)
        return sum > 0;
    }

    // addIngredientsHandler = (type) => {
    //     const oldValue = this.state.ingredients[type];
    //     const addedValue = oldValue + 1;
    //     const newIngredients = {
    //         ...this.state.ingredients
    //     };
    //     newIngredients[type]=addedValue;
    //     const oldPrice = this.state.totalPrice;
    //     const addedPrice = IngredientsPrice[type];
    //     const newPrice = addedPrice + oldPrice;
    //     this.setState({totalPrice:newPrice,ingredients:newIngredients});
    //     this.updatePurchaseInfo(newIngredients);
    // }
    // removeIngredientsHandler = (type) => {
    //     const oldValue = this.state.ingredients[type];
    //     if(oldValue>0){
            
    //         const newValue = oldValue - 1;
    //         const newIngredients = {
    //             ...this.state.ingredients
    //         };
    //         newIngredients[type]=newValue;
    //         const oldPrice = this.state.totalPrice;
    //         const addedPrice = IngredientsPrice[type];
    //         const newPrice = oldPrice - addedPrice;
    //         this.setState({totalPrice:newPrice,ingredients:newIngredients});
    //         this.updatePurchaseInfo(newIngredients); 
    //     }
    //     else{
    //         return
    //     }
        
    // }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancel = () => {
        this.setState({purchasing: false})
    }

    purchaseContinue = () => {
        // for passing components through url
        // const queryParams = [];
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push("price="+this.props.price);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname : '/checkout',
        //     search : '?' + queryString
        // });
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p style={{padding: 10}}>Ingredients of the burger could not load</p> : <Spinner />;

        if(this.state.ingredients!==null){
            burger =
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                    adder = {this.props.onAddedIngredients}
                    remover = {this.props.onRemovedIngredients}
                    disabled={disabledInfo}
                    ordered = {this.purchaseHandler}
                    purchaseable={this.updatePurchaseInfo(this.props.ings)}
                    totalPrice={this.props.price}/>
                </Aux>
            orderSummary = <OrderSummary
            ingredients={this.props.ings}
            continue={this.purchaseContinue}
            cancelled={this.purchaseCancel}
            price = {this.props.price}/>
        }
        

        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings : state.ingredients,
        price : state.totalPrice
    }    
}

const mapDispatchToProps = dispatch => {
    return {
        onAddedIngredients : (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName : ingName}),
        onRemovedIngredients : (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName : ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));