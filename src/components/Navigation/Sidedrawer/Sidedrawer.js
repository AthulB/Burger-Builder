import React from 'react';
import classes from './Sidedrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/BackDrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sidedrawer = (props) => {
    let acquiredClasses=[classes.Sidedrawer,classes.Open]
    if(!props.open){
        acquiredClasses = [classes.Sidedrawer,classes.Closed]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={acquiredClasses.join(' ')}>
            <div className={classes.Logo}>
            <Logo />
            </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
        
    )
}

export default sidedrawer;
