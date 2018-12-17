import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	messages:[],
	commentNext:'',
	count:'',
	replyNext:''
});

const getMessage = (state, action) => {
	return state.merge({
		'messages': action.comments.concat(action.replies),
		'commentNext': action.commentNext,
		'count':action.commentCount+action.replyCount,
		'replyNext':action.replyNext
	});
};


const getMoreComment = (state, action) => {
	return state.merge({
		'messages': state.get('messages').concat(action.comments),
		'commentNext': action.commentNext
	});
};

const getMoreReply = (state, action) => {
	return state.merge({
		'messages': state.get('messages').concat(action.replies),
		'replyNext': action.replyNext
	});
};


export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.GET_MESSAGE:
			return getMessage(state,action)
		case constants.GET_MORE_COMMENT:
			return getMoreComment(state,action)
		case constants.GET_MORE_REPLY:
			return getMoreReply(state,action)
		default:
			return state;
	}
}