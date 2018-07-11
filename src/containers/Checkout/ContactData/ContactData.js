import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component{
    state={
        orderForm:{
            name:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Your Name"
                },
                value:'',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            street:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Your Street"
                },
                value:'',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            zipcode:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Zip Code"
                },
                value:'',
                validation : {
                    required : true,
                    length : 6
                },
                valid : false,
                touched : false
            },
            country:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Your Country"
                },
                value:'',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            email:{
                elementType:"input",
                elementConfig:{
                    type:"text",
                    placeholder:"Your Mail"
                },
                value:'',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            deliveryMethod:{
                elementType:"select",
                elementConfig:{
                    options:[
                        {value:"cheapest",displayValue:"Cheapest"},
                        {value:"fastest",displayValue:"Fastest"},
                    ]
                },
                validation : {},
                value:'',
                valid:true
            }           
        },
        formIsValid : false,
        loading : false
    }

    checkValidityHandler = (value,rules) => {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !=='' && isValid
        }

        if(rules.length){
            isValid = value.trim().length === rules.length && isValid 
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        this.setState({loading:true})
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            orderData : formData
        }
        //.json is a special requirement for firebase
        axios.post('/orders.json',order)
        .then((response)=>{this.setState({loading : false})
        this.props.history.push('/');})
        .catch((error)=>{this.setState({loading : false})});
    }

    inputEventHandler = (event,inputIdentifier) => {

        //Two way binding
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedOrderFormElement={
            ...updatedOrderForm[inputIdentifier]
        };
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidityHandler(updatedOrderFormElement.value,updatedOrderFormElement.validation)
        updatedOrderFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;

        let formIsValid = true
        for(let inputElement in updatedOrderForm){
            formIsValid = updatedOrderForm[inputElement].valid && formIsValid
        }
        this.setState({orderForm : updatedOrderForm , formIsValid : formIsValid});

    }
    render(){
        const formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }
        let form = <form>
            {formElements.map(formElement=>(
                <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value} 
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputEventHandler(event,formElement.id)}/>
            ))}
            <Button disabled={!this.state.formIsValid} type="Success" clicked={this.orderHandler}>ORDER</Button>
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