import React,{ Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuidControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const IngredientsPrice = {
    salad:0.4,
    meat:1.3,
    bacon:0.7,
    cheese:0.5
}

class BurgerBuilder extends Component {
    
    state ={
            ingredients : null,
            totalPrice: 4,
            purchaseable:false,
            purchasing:false,
            loading : false,
    }

    componentWillMount(){
        axios.get('/ingredients.json')
            .then(response=>{
                this.setState({ingredients:response.data})
            })
            .catch(error=>{
                this.setState({error:true})
            })
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
        // alert("You continue the purchase");
        this.setState({loading:true})
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            address : {
                street : 'Teststreet1',
                zipcode : '123654',
                country : 'India'
            }
        }
        //.json is a special requirement for firebase
        axios.post('/orders.json',order)
            .then(response=>{this.setState({loading : false,purchasing : false})})
            .catch(error=>{this.setState({loading : false,purchasing : false})});
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p style={{padding: 10}}>Ingredients of the burger could not load</p> : <Spinner />;

        if(this.state.ingredients!==null){
            burger =
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                    adder = {this.addIngredientsHandler}
                    remover = {this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    ordered = {this.purchaseHandler}
                    purchaseable={this.state.purchaseable}
                    totalPrice={this.state.totalPrice}/>
                </Aux>
            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            continue={this.purchaseContinue}
            cancelled={this.purchaseCancel}
            price = {this.state.totalPrice}/>
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

export default withErrorHandler(BurgerBuilder,axios);