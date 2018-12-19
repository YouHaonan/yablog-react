import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const getPosts=tagID=> {	
	const tagPostsUrl=
	(typeof(tagID) === 'undefined')? '/api/posts/':
	`/api/tags/${tagID}/posts/`
	return axios.get(constants.PATH_BATH + tagPostsUrl);
};
  
const getTags=()=> {
	// const tagList = JSON.parse(sessionStorage.getItem('tagList')) || axios.get(constants.PATH_BATH + '/api/tags/');
	// return tagList
	return axios.get(constants.PATH_BATH + '/api/tags/');
};

const shouldGetTags = state => {
	return state.getIn(['home','tagList']).size===0 
  };



const changeHomeTag = (tags) => ({
	type: constants.CHANGE_HOME_TAG,	
	tagList: fromJS(tags.tags),
	tagNextPage:tags.next
});


const addHomeList = (list, nextPage) => ({
	type: constants.ADD_ARTICLE_LIST,
	list: fromJS(list),
	nextPage
});

const changeTags =(result, tagNext)=>({
	type:constants.CHANGE_TAGS,
	tags: fromJS(result),
	tagNext
});

const changeTagPosts = (tagPosts,nextTagPostPage) => ({
	type: constants.CHANGE_TAG_POSTS,
	list: fromJS(tagPosts),
	nextTagPostPage
});

export const changeHomePost = (articleList,articleNextPage) => ({
	type: constants.CHANGE_HOME_POST,
	articleList: fromJS(articleList),
	articleNextPage
});

export const getHomeInfo = (tagID,searchKey) => {
	return (dispatch,getState) => {
		if (shouldGetTags(getState())){
			axios.all([getPosts(tagID), getTags()])
		.then(axios.spread(function (posts, tags)
		{
			const postList = posts.data.posts;
			const nextPage = posts.data.next;
			const tagList =  tags.data;
			dispatch(changeHomePost(postList,nextPage))
			dispatch(changeHomeTag(tagList))
		}));
		}else if(searchKey){
			return;
		}else{
			getPosts(tagID).then(
				res=>{
				const postList = res.data.posts;
				const nextPage = res.data.next;
				dispatch(changeHomePost(postList,nextPage))
				}
			)
		}
		
			
		
	}
}

export const changeTagPage = (tagNext) =>{
	return(dispatch) =>{
		const nexturl = tagNext || '/api/tags/'
		axios.get(constants.PATH_BATH + nexturl).then(
			(res)=>{
				// const tagList = JSON.stringify(res)
				// sessionStorage.setItem('tagList',tagList)
				const result = res.data.tags;
				const tagNext = res.data.next;
				dispatch(changeTags(result, tagNext))
			}
		)
	}
	
}


export const getMoreList = (nextPage) => {
	return (dispatch) => {
		axios.get(constants.PATH_BATH + nextPage).then((res) => {
			const result = res.data.posts;
			const nextPage = res.data.next;
			dispatch(addHomeList(result, nextPage));
		});
	}
}

export const getTagPosts = tagID =>{
	return(dispatch) =>{
		if (typeof(tagID)==='undefined'){
			axios.get(constants.PATH_BATH + '/api/posts/').then(res=>{
				const postList = res.data.posts;
				const nextPage = res.data.next;
				dispatch(changeHomePost(postList,nextPage))
			})}else{
			axios.get(constants.PATH_BATH + `/api/tags/${tagID}/posts/`).then(
				res=>{
				const tagPosts = res.data.posts;
				const nextTagPostPage=res.data.next
				dispatch(changeTagPosts(tagPosts,nextTagPostPage))
				}
			)
	}
	
}}

export const toggleFixedSide = (fixed) => ({
	type: constants.TOGGLE_FIXED_SIDE,
	fixed
})

export const clearFixed = () => ({
	type: constants.CLEAR_FIXED
})

export const deletePost = (postID, tagID) =>{
	return(dispatch,getState) =>{
		axios({
			method: 'delete',
			url: constants.PATH_BATH + `/api/posts/${postID}`,
			headers: {'Authorization':`Bearer ${getState().getIn(['login', 'token'])}`}
		}).then(
			function (res){
				if (res.status===204){
					getPosts(tagID).then(
						res=>{
						const postList = res.data.posts;
						const nextTagPostPage=res.data.next;
						dispatch(changeHomePost(postList,nextTagPostPage))
						}
					).catch(function(err){
						if (err.response.status===404){
							dispatch(changeHomePost([],''))
						}
					})
				}
			}
		)
	}
	
}