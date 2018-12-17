import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	postID:'',
	tags:'',
	title:'',
	body:'',
	photoName:[]
});

const setInitialPost=(state,action)=>{
	return state.merge({
		'title':action.title,
		'body': action.body,
		'tags':action.tags
	})
}



export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.SUBMIT_SUCCESS:
			return state.set('postID', action.postID);
		case constants.CLEAR_STATUS:
			return defaultState
		case constants.GET_INITIAL_POST:
			return setInitialPost(state, action);	
		case constants.CHANGE_BODY:
			return state.set('body', action.body);
		case constants.CHANGE_TAG:
			return state.set('tags', action.tags);
		case constants.CHANGE_TITLE:
			return state.set('title', action.title);
		case constants.GET_PHOTO_NAME:
			return state.set('photoName', state.get('photoName').push(action.photoName));
		default:
			return state;
	}
}