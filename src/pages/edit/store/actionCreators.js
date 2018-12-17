import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const submitSuccess= postID =>({
	type: constants.SUBMIT_SUCCESS,
	postID
})

const getPost= (title,body, tags) =>({
	type: constants.GET_INITIAL_POST,
	title,
	body:fromJS(body),
	tags
})

const getPhotoName = (photoName)=>({
	type:constants.GET_PHOTO_NAME,
	photoName
})

export const editPost = (title, content, tags,ID,nameList) => {
	return (dispatch, getState) => {
		if (ID){
			axios({
				method: 'put',
				url: constants.PATH_BATH + `/api/posts/${ID}`,
				data: {
					title,
					body:content,
					tags,
					nameList
				},
				headers: {'Authorization':`Bearer ${getState().getIn(['login', 'token'])}`}
				}).then(() => {
					dispatch(submitSuccess(ID))
				})
		}else{
			axios({
				method: 'post',
				url: constants.PATH_BATH + '/api/posts/',
				data: {
					title,
					body:content,
					tags,
					nameList
				},
				headers: {'Authorization':`Bearer ${getState().getIn(['login', 'token'])}`}
			}).then((res) => {
				const postID=res.data.id
				dispatch(submitSuccess(postID))
			})}
	}
}

export const getInitialPost=(ID)=>{
	return(dispatch)=> {
		axios.get(constants.PATH_BATH + `/api/posts/${ID}`).then((res) =>{
		const title = res.data.title
      	const body = res.data.body
		const tags = res.data.tags.join()
		dispatch(getPost(title, body, tags))
		})
	}
}

export const upLoadFn=(param)=>{
	return(dispatch,getState)=> {
		const fd = new FormData()
		const config = {
			onUploadProgress: (progressEvent) => {
			let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
			param.progress(percentCompleted)
			},
			headers:{'Authorization':`Bearer ${getState().getIn(['login', 'token'])}`}}
		fd.append('photo', param.file)
		axios.post(constants.PATH_BATH +'/api/photos/', fd,config).then((res) => {
			const url=res.data.url
			const photoName =res.data.photo_name
			param.success({
				url: url
			  })
			dispatch(getPhotoName(photoName))
		})
	}
}


export const changeBody=(editorState)=>({
	type:constants.CHANGE_BODY,
	body:editorState
})

export const changeTag=(e)=>({
	type:constants.CHANGE_TAG,
	tags:e.target.value
})

export const changeTitle=(e)=>({
	type:constants.CHANGE_TITLE,
	title:e.target.value
})

export const clearStatus= ()=>({
	type: constants.CLEAR_STATUS})
