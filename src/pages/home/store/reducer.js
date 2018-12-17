import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	articleList: [],
	articleNextPage:'',
	fixedSideBar: false,
	tagList:[],
	tagNextPage:'',
});

const changeHomePost = (state, action) => {
	return state.merge({
		articleList: action.articleList,
		articleNextPage: action.articleNextPage
	});
};

const changeHomeTag = (state, action) => {
	return state.merge({
		tagList:action.tagList,
		tagNextPage:action.tagNextPage
	});
};

const addArticleList = (state, action) => {
	return state.merge({
		'articleList': state.get('articleList').concat(action.list),
		'articleNextPage': action.nextPage
	});
};

const changeTags = (state, action) => {
	return state.merge({
		'tagList': action.tags,
		'tagNextPage': action.tagNext
	});
};

const changeTagPosts = (state, action) =>{
	return state.merge({
		'articleList': action.list,
		'articleNextPage': action.nextTagPage
	})
}

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_HOME_POST:
			return changeHomePost(state, action);
		case constants.CHANGE_HOME_TAG:
			return changeHomeTag(state, action);
		case constants.ADD_ARTICLE_LIST:
			return addArticleList(state, action);
		case constants.TOGGLE_FIXED_SIDE:
			return state.set('fixedSideBar', action.fixed);
		case constants.CHANGE_TAGS:
			return changeTags(state, action)
		case constants.CHANGE_TAG_POSTS:
			return changeTagPosts(state, action)
		default:
			return state;
	}
}