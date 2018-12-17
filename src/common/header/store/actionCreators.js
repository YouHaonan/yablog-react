import { constants } from './index';
import { fromJS } from 'immutable';
import{ actionCreators as homeActionCreators } from '../../../pages/home/store'
import axios from 'axios';

export const searchFocus = () => ({
    type: constants.SEARCH_FOCUS
})

export const searchBlur = () => ({
    type: constants.SEARCH_BLUR
})

export const inputChange=(e)=>({
    type:constants.INPUT_CHANGE,
    inputValue: fromJS(e.target.value)
})


export const searchPost=(value)=>{
    return(dispatch)=> {
		axios({
            method: 'post',
            url: constants.PATH_BATH + '/api/search/',
            data: {
                q:value
            }
        }).then(res=>{
            const artileList = res.data.posts
            const next = null
            dispatch(homeActionCreators.changeHomePost(artileList,next))
        })
	}
}