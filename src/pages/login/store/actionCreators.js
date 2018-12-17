import axios from 'axios';
import * as constants from './constants';

const changeLogin = (token) => ({
	type: constants.CHANGE_LOGIN,
	token
})

export const logout = () => ({
	type: constants.LOGOUT
})

export const login = (username, password) => {
	return (dispatch) => {
		axios.post(constants.PATH_BATH + '/api/oauth/token/',{
			grant_type:'password',
			username,
			password
		}).then((res) => {
			const token = res.data.access_token;
				dispatch(changeLogin(token))
		}).catch(function (error) {
			if (error) {
			  alert('账号密码错误！')
			}})
	}
}