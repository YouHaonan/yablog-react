import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';
import { getName } from '../../../utils'


const changeDetail = (post, tagList, commentList, byIDList) => ({
	type: constants.CHANGE_DETAIL,
	post: fromJS(post),
	tags: fromJS(tagList),
	comments:fromJS(commentList.comments),
	nextComment:fromJS(commentList.next)
});

const changeReply = (list, next,id) => ({
	type: constants.CHANGE_REPLY,
	replyList: fromJS(list),
	next: fromJS(next),
	id
});

const addMoreComment = (list, nextComment) => ({
	type: constants.ADD_MORE_COMMENT,
	list: fromJS(list.comments),
	nextComment:fromJS(nextComment)
});

const addMoreReply = (list, next, id) => ({
	type: constants.ADD_MORE_REPLY,
	list: fromJS(list.replies),
	next:fromJS(next),
	id:fromJS(id)
});


const addNewComment = (comment) => ({
	type: constants.ADD_NEW_COMMENT,
	comment: fromJS(comment)
});

const addNewReply = (reply,id) => ({
	type: constants.ADD_NEW_REPLY,
	reply: fromJS(reply),
	id:fromJS(id)
});

const getPostTag=(post)=>{
	return axios.get(constants.PATH_BATH +post.tags_url)
};

const getPostComment=(post)=>{
	return axios.get(constants.PATH_BATH +post.comments_url)
};

const getComment=(comments, next)=>({
	type:constants.GET_COMMENT,
	comments:fromJS(comments),
	next:fromJS(next)
})


export const getDetail = (id) => {
	return (dispatch) => {
		axios.get(constants.PATH_BATH +`/api/posts/${id}`).then((res) => {
			const post = res.data;
			axios.all([getPostTag(post), getPostComment(post)])
			.then(axios.spread(function (tags, comments)
			{
				const tagList = tags.data;
				const commentList =  comments.data;
				dispatch(changeDetail(post, tagList, commentList))
			}))
		})
	}
};

export const getMoreComment = (nextComment) => {
	return (dispatch) => {
		axios.get(constants.PATH_BATH + nextComment).then((res) => {
			const list = res.data;
			const nextComment = res.data.next;
			dispatch(addMoreComment(list, nextComment));
		});
	}
}

export const getMoreReply = (id, next) => {
	return (dispatch) => {
		axios.get(constants.PATH_BATH + next).then((res) => {
			const list = res.data;
			const next = res.data.next;
			dispatch(addMoreReply(list, next,id));
		});
	}
}

export const submitComment = (comment,id) => {
	return (dispatch,getState) => {
		const token=getState().getIn(['login', 'token'])
		const headers=token? {'Authorization':`Bearer ${token}`}:null
		const localAuthorName = localStorage.getItem('author')
		let author = ''
		if (localAuthorName){
			author = token?'':localAuthorName
		}else{
			author = getName()
			localStorage.setItem('author',author)
		}	
		axios({
			method: 'post',
			url: constants.PATH_BATH + `/api/posts/${id}/comments/`,
			data: {
				body:comment,
				author
			},
			headers
		}).then((res) => {
			const newComment=res.data;
			dispatch(addNewComment(newComment));
		})
	}
}

export const replySubmit = (value,to,id,toAdmin) => {
	return (dispatch,getState) => {
		const token=getState().getIn(['login', 'token'])
		const headers=token? {'Authorization':`Bearer ${token}`}:null
		const localAuthorName = localStorage.getItem('author')
		let author = ''
		if (localAuthorName){
			author = token?'':localAuthorName
		}else{
			author = getName()
			localStorage.setItem('author',author)
		}	
		axios({
			method: 'post',
			url: constants.PATH_BATH + `/api/comments/${id}/replies/`,
			data: {
				body:value,
				author,
				to,
				to_admin:toAdmin
			},
			headers
		}).then((res) => {
			const show = getState().getIn(['detail','byIDList',`${id}`,'show'])
			const newReply=res.data;
			if (show){
				dispatch(addNewReply(newReply,id))
			}else{
				dispatch(getReply(id))
				dispatch(showReply(id))

			}
			dispatch(addCount(id))
			dispatch(cancelReply(id))
		})
	}
}

export const deleteComment =(id,token,url)=>{
	return (dispatch)=>{
		axios({
			method: 'delete',
			url: constants.PATH_BATH + `/api/comments/${id}`,
			headers: {'Authorization':`Bearer ${token}`}
		}).then((res)=>{
			if (res.status ===204){
				axios({
					method: 'get',
					url: constants.PATH_BATH + url,
				}).then((res) => {
					const comments = res.data.comments
					const nextPage = res.data.next
					dispatch(getComment(comments, nextPage));
				});
			}
		})
	}
}

export const deleteReply =(replyID,token,commentID)=>{
	return (dispatch)=>{
		axios({
			method: 'delete',
			url: constants.PATH_BATH + `/api/replies/${replyID}`,
			headers: {'Authorization':`Bearer ${token}`}
		}).then((res)=>{
			if (res.status ===204){
				dispatch(getReply(commentID))
				dispatch(subCount(commentID))
			}
		})
	}
}

export const toggleComment =(id,token,url)=>{
	return (dispatch)=>{
		axios({
			method: 'put',
			url: constants.PATH_BATH + `/api/comments/${id}`,
			headers: {'Authorization':`Bearer ${token}`}
		}).then((res)=>{
			if (res.status ===200){
				axios({
					method: 'get',
					url: constants.PATH_BATH + url,
				}).then((res) => {
					const comments = res.data.comments
					const nextPage = res.data.next
					dispatch(getComment(comments, nextPage));
				});
			}
		})
	}
}

export const toggleReply =(replyID,token,commentID)=>{
	return (dispatch)=>{
		axios({
			method: 'put',
			url: constants.PATH_BATH + `/api/replies/${replyID}`,
			headers: {'Authorization':`Bearer ${token}`}
		}).then((res)=>{
			if (res.status ===200){
			dispatch(getReply(commentID))
			}
		})
	}
}

export const getReply = (id) => {
	return (dispatch) => {
		axios.get(constants.PATH_BATH + `/api/comments/${id}/replies/`).then((res) => {
			
			const list = res.data.replies;
			const next = res.data.next;
			dispatch(changeReply(list, next,id))
		});
	}
}

export const showReply=(id)=>({
	type: constants.SHOW_REPLY,
	id:fromJS(id)
})

export const showReplyArea=(id,preID,replyTo,toAdmin)=>({
	type: constants.SHOW_REPLY_AREA,
	id:fromJS(id),
	preID:fromJS(preID),
	replyTo:fromJS(replyTo),
	toAdmin:fromJS(toAdmin)
})

export const cancelReply=(id)=>({
	type: constants.CANCEL_REPLY,
	id:fromJS(id)
})

export const replyChange=(value)=>({
	type: constants.REPLY_CONTENT_CHANGE,
	value:fromJS(value)
})

export const addCount=(id)=>({
	type: constants.ADD_COUNT,
	id:fromJS(id)
})
export const subCount=(id)=>({
	type: constants.SUB_COUNT,
	id:fromJS(id)
})

