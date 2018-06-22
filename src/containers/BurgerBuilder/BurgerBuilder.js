import React,{ Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuidControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const IngredientsPrice = {
    salad:0.4,
    meat:1.3,
    bacon:0.7,
    cheese:0.5
}

export default class BurgerBuilder extends Component {
    constructor(props){
        super(props);
        this.state ={
            ingredients : {
                salad:0,
                bacon:0,
                cheese:0,
                meat:0,    
            },
            totalPrice: 4,
            purchaseable:false,
            purchasing:false
        }
    }
    
    updatePurchaseInfo(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        },0)
        this.setState({purchaseable : sum > 0});
    }

    addIngredientsHandler = (type) => {
        const oldValue = this.state.ingredients[type];
        const addedValue = oldValue + 1;
        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type]=addedValue;
        const oldPrice = this.state.totalPrice;
        const addedPrice = IngredientsPrice[type];
        const newPrice = addedPrice + oldPrice;
        this.setState({totalPrice:newPrice,ingredients:newIngredients});
        this.updatePurchaseInfo(newIngredients);
    }
    removeIngredientsHandler = (type) => {
        const oldValue = this.state.ingredients[type];
        if(oldValue>0){
            
            const newValue = oldValue - 1;
            const newIngredients = {
                ...this.state.ingredients
            };
            newIngredients[type]=newValue;
            const oldPrice = this.state.totalPrice;
            const addedPrice = IngredientsPrice[type];
            const newPrice = oldPrice - addedPrice;
            this.setState({totalPrice:newPrice,ingredients:newIngredients});
            this.updatePurchaseInfo(newIngredients); 
        }
        else{
            return
        }
        
    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancel = () => {
        this.setState({purchasing: false})
    }

    purchaseContinue = () => {
        alert("You continue the purchase");
    }


    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
                    <OrderSummary
                    ingredients={this.state.ingredients}
                    continue={this.purchaseContinue}
                    cancelled={this.purchaseCancel}
                    price = {this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                adder = {this.addIngredientsHandler}
                remover = {this.removeIngredientsHandler}
                disabled={disabledInfo}
                ordered = {this.purchaseHandler}
                purchaseable={this.state.purchaseable}
                totalPrice={this.state.totalPrice}/>
            </Aux>
        )
    }
}