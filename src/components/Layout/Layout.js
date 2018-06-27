import React,{ Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component{

    state={
        showSidedrawer : false
    }

    sidedrawerHandler = () => {
        this.setState({showSidedrawer:false})
    }

    toggleSidedrawerHandler = () => {
        const show = this.state.Sidedrawer;
        this.setState({showSidedrawer:!show})
    }

    render(){
        return(
            <Aux>
                <Toolbar click={this.toggleSidedrawerHandler}/>
                <Sidedrawer open={this.state.showSidedrawer} closed={this.sidedrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
