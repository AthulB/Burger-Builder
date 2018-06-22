import React from 'react';
import classes from './BuildControls.css';
import BuildControl from '../BuidControls/BuildControl/BuildControl';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
]
    

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map((ctrl)=>{
                return <BuildControl
                        label={ctrl.label}
                        key={ctrl.label}
                        added={()=>props.adder(ctrl.type)}
                        removed={()=>props.remover(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}/>})}
            <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>ORDER NOW</button>            
        </div>
    )
}

export default buildControls;