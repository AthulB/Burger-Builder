import React from 'react';
import classes from './Sidedrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/BackDrop/Backdrop';
import Auxilliary from '../../../hoc/Auxilliary';

const sidedrawer = (props) => {
    let acquiredClasses=[classes.Sidedrawer,classes.Open]
    if(!props.open){
        acquiredClasses = [classes.Sidedrawer,classes.Closed]
    }
    return (
        <Auxilliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={acquiredClasses.join(' ')}>
            <div className={classes.Logo}>
            <Logo />
            </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxilliary>
        
    )
}

export default sidedrawer;
