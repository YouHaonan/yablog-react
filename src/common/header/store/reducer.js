import { constants } from './index';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    focused: false,
    inputValue:'',
   
});

export default (state = defaultState, action) =>{
    switch(action.type){
        case constants.SEARCH_FOCUS:
            return state.set('focused', true);
        case constants.SEARCH_BLUR:
            return state.set('focused', false);
        case constants.INPUT_CHANGE:
            return state.set('inputValue', action.inputValue);
        default:
            return state;
        
        

    }
}