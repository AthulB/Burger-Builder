import React from 'react';
import Auxilliary from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    let ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return(
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</span>
            </li>
        )
    })
    return (
        <Auxilliary>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Are you done picking?</p>
            <Button type="Success" clicked={props.continue}>CONTINUE</Button>
            <Button type="Danger" clicked={props.cancelled}>CANCEL</Button>
        </Auxilliary>
    )
}

export default orderSummary;