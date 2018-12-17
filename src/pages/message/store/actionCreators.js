import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

// const getComment = (comments, nextPage, count) => ({
// 	type: constants.GET_UNREAD_COMMENT,
// 	comments: fromJS(comments),
// 	nextPage,
// 	count
// });

const getMessage = (comments, replies)=>({
	type:constants.GET_MESSAGE,
	comments:fromJS(comments.comments),
	commentNext:fromJS(comments.next),
	commentCount:fromJS(comments.count),
	replies:fromJS(replies.replies),
	replyNext:fromJS(replies.next),
	replyCount:fromJS(replies.count)
})

const moreComment = (comments, commentNext, commentCount) => ({
	type: constants.GET_MORE_COMMENT,
	comments: fromJS(comments),
	commentNext:fromJS(commentNext),
	commentCount:fromJS(commentCount)
});

const moreReply = (replies, replyNext, replyCount) => ({
	type: constants.GET_MORE_REPLY,
	replies: fromJS(replies),
	replyNext:fromJS(replyNext),
	replyCount:fromJS(replyCount)
});

const getComments = token=>{
	return axios({
		method: 'get',
		url: constants.PATH_BATH + '/api/comments/',
		headers: {'Authorization':`Bearer ${token}`}
	})
}

const getReplies = token=>{
	return axios({
		method: 'get',
		url: constants.PATH_BATH + '/api/replies/',
		headers: {'Authorization':`Bearer ${token}`}
	})
}

export const getUnreadMessage = (token) => {
	return (dispatch) => {
			axios.all([getComments(token), getReplies(token)])
			.then(axios.spread(function(comment,reply)
			{
				const comments = comment.data;
				const replies =  reply.data;
				dispatch(getMessage(comments, replies))
			}))
		
	}
};

// export const getUnreadMessage = (token) => {
// 	return (dispatch) => {
// 		axios({
// 			method: 'get',
// 			url: constants.PATH_BATH + '/api/comments/',
// 			headers: {'Authorization':`Bearer ${token}`}
// 		}).then((res) => {
// 			const comments = res.data.comments;
// 			const nextPage = res.data.next;
// 			const count = res.data.count;
// 			dispatch(getComment(comments, nextPage, count));
// 		});
// 	}
// }

export const getMoreComment = (next,token) => {
	return (dispatch) => {
		axios({
			method: 'get',
			url: constants.PATH_BATH + next,
			headers: {'Authorization':`Bearer ${token}`}
		}).then((res) => {
			const comments = res.data.comments;
			const commentNext = res.data.next;
			const commentCount = res.data.count;
			dispatch(moreComment(comments, commentNext, commentCount));
		});
	}
}

export const getMoreReply = (next,token) => {
	return (dispatch) => {
		axios({
			method: 'get',
			url: constants.PATH_BATH + next,
			headers: {'Authorization':`Bearer ${token}`}
		}).then((res) => {
			const replies = res.data.replies;
			const replyNext = res.data.next;
			const replyCount = res.data.count;
			dispatch(moreReply(replies, replyNext, replyCount));
		});
	}
}

export const toggleStatus =(id,name,token)=>{
	return (dispatch)=>{
		const url = name==='comment'? '/api/comments/':'/api/replies/'
		axios({
			method: 'put',
			url: constants.PATH_BATH + url+id,
			headers: {'Authorization':`Bearer ${token}`}
		}).then((res)=>{
			if (res.status ===200){
				dispatch(getUnreadMessage(token))
			}
		})
	}
}

export const deleteMessage =(id,name,token)=>{
	return (dispatch)=>{
		const url = name==='comment'? '/api/comments/':'/api/replies/'
		axios({
			method: 'delete',
			url: constants.PATH_BATH + url+id,
			headers: {'Authorization':`Bearer ${token}`}
		}).then((res)=>{
			if (res.status ===204){
				dispatch(getUnreadMessage(token))
			}
		})
	}
}