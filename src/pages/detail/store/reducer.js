import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	post: {tags:[]},
	tags:{tags:[]},
	comments:[],
	nextComment:'',
	byIDList:{},
	activeID:'',
	replyContent:'',
	replyTo:'',
	toAdmin:false
});

const getByIDList = list=>{
	let commentsByID={}
	list.forEach(item => {
		commentsByID[item.get('id')]={
			show:false,
			replyList:[],
			next:'',
			showReplyArea:false,
			count:item.get('reply_count')
		}
	});
	return fromJS(commentsByID)
};

const addMoreComment = (state, action) => {
	return state.merge({
		'comments': state.get('comments').concat(action.list),
		'byIDList':state.get('byIDList').concat(getByIDList(action.list)),
		'nextComment': action.nextComment
	});
};

const addMoreReply = (state, action) => {
	return state.setIn(
		['byIDList',`${action.id}`,'replyList'],state.getIn(['byIDList',`${action.id}`,'replyList']).concat(action.list)
	).setIn(
		['byIDList',`${action.id}`,'next'],action.next
	)
};

const getHomeDetail= (state, action) =>{
	return state.merge({
		'post': action.post,
		'tags': action.tags,
		'comments':action.comments,
		'nextComment':action.nextComment,
		'byIDList':getByIDList(action.comments)
	})
};

const getComment= (state, action) =>{
	return state.merge({
		'comments':action.comments,
		'byIDList':getByIDList(action.comments),
		'nextComment':action.next
	})
};

const addNewComment = (state, action) => {
	const nextComment=state.get('nextComment')
	if(nextComment){
		const newComments = state.get('comments').pop().insert(0,action.comment)
		const byIDList = state.get('byIDList').slice(0,-1).concat(getByIDList([action.comment]))
		return state.merge({
			'comments':newComments,
			'byIDList':byIDList
	})
	}else{
		const newComments = state.get('comments').insert(0,action.comment)
		const byIDList = state.get('byIDList').concat(getByIDList([action.comment]))
		return state.merge({
			'comments':newComments,
			'byIDList':byIDList
		})
	}
};

const addNewReply = (state, action) => {
	const next=state.getIn(['byIDList',`${action.id}`,'next'])
	if(next){
		const newReplies = state.getIn(['byIDList',`${action.id}`,'replyList']).pop().insert(0,action.reply)
		return state.setIn(
			['byIDList',`${action.id}`,'replyList'],newReplies
	)
	}else{
		const newReplies = state.getIn(['byIDList',`${action.id}`,'replyList']).insert(0,action.reply)
		return state.setIn(
			['byIDList',`${action.id}`,'replyList'],newReplies
	)
	}
};

const changeReply = (state,action)=>{
	return state.setIn(['byIDList',`${action.id}`,'replyList'],action.replyList)
	.setIn(['byIDList',`${action.id}`,'next'],action.next)
};

const showReplyArea = (state,action)=>{
	return state.setIn(['byIDList',`${action.preID}`,'showReplyArea'],false)
			.setIn(['byIDList',`${action.id}`,'showReplyArea'],true)
			.set('activeID',action.id)
			.set('replyTo',action.replyTo)
			.set('toAdmin',action.toAdmin)
			.set('replyContent','')
};

const showReply = (state, action)=>{
	return state.setIn(['byIDList',`${action.id}`,'show'],!state.getIn(['byIDList',`${action.id}`,'show']))
};

const cancelReply = (state,action)=>{
	return state.setIn(['byIDList',`${action.id}`,'showReplyArea'],false)
			.set('activeID','')
			.set('replyContent','')
			.set('replyTo','')
			.set('toAdmin',false)
};

const addCount = (state,action)=>{
	const newCount = state.getIn(['byIDList',`${action.id}`,'count'])+1
	return state.setIn(['byIDList',`${action.id}`,'count'],newCount)
};
const subCount = (state,action)=>{
	const newCount = state.getIn(['byIDList',`${action.id}`,'count'])-1
	return state.setIn(['byIDList',`${action.id}`,'count'],newCount)
};
export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_DETAIL:
			return getHomeDetail(state,action)
		case constants.ADD_MORE_COMMENT:
			return addMoreComment(state,action)
		case constants.ADD_MORE_REPLY:
			return addMoreReply(state,action)
		case constants.ADD_NEW_COMMENT:
			return addNewComment(state,action)
		case constants.GET_COMMENT:
			return getComment(state,action)
		case constants.SHOW_REPLY:
			return showReply(state,action)
		case constants.SHOW_REPLY_AREA:
			return showReplyArea(state,action)
		case constants.CHANGE_REPLY:
			return changeReply(state,action)
		case constants.CANCEL_REPLY:
			return cancelReply(state, action)
		case constants.REPLY_CONTENT_CHANGE:
			return state.set('replyContent',action.value)
		case constants.ADD_COUNT:
			return addCount(state, action)
		case constants.SUB_COUNT:
			return subCount(state, action)
		case constants.ADD_NEW_REPLY:
			return addNewReply(state, action)
		default:
			return state;
	}
}