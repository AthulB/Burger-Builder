import * as actionTypes from './actions';

const initialState = {
    ingredients : {
        salad : 0,
        bacon : 0,
        meat : 0,
        cheese : 0
    },
    totalPrice : 4
}

const ingredientPrices = {
    salad : 0.5,
    cheese : 0.4,
    bacon : 0.7,
    meat : 1.3
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case (actionTypes.ADD_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + ingredientPrices[action.ingredientName]

            }
        case (actionTypes.REMOVE_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - ingredientPrices[action.ingredientName]
                
            }
        default :
            return state
    }
}

export default reducer;