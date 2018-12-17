import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	token:''
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_LOGIN:
			return state.set('token', action.token);
		case constants.LOGOUT:
			return state.set('token', '');
		default:
			return state;
	}
}