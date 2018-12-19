import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './components/List';
import SideBar from './components/SideBar';
import { actionCreators } from './store';
import BackTop from '../../common/backtop';
import Header  from '../../common/header/index';
import { actionCreators as logActionCreators } from '../login/store';

import { 
	HomeWrapper,
	HomeLeft,
	HomeRight
} from './style';

class Home extends Component {

	render() {
		return (
			<div>
				<Header/>
				<HomeWrapper>
					<HomeLeft>
						<List{...this.props} />
					</HomeLeft>
					<HomeRight>
						<SideBar{...this.props}/>
					</HomeRight>
					<BackTop scrollTop='800'/>
				</HomeWrapper>
			</div>
		)
	}

	componentDidMount() {
		window.addEventListener('scroll', this.props.handleFixSideBar);
		this.props.changeHomeData(this.props.match.params.id, this.props.match.params.key);
	}
	
	componentWillReceiveProps(nextProps){
		if (nextProps.location.pathname !== this.props.location.pathname && !nextProps.match.params.key) {
		this.props.getTagPosts(nextProps.match.params.id)
		}
	}

	componentWillMount(){
		window.scrollTo(0,0)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.handleFixSideBar);
		this.props.clearFixed()
    }

}

const mapState = (state) => ({
	list: state.getIn(['home', 'articleList']),
	nextPage: state.getIn(['home', 'articleNextPage']),
	token: state.getIn(['login','token']),
	showScroll: state.getIn(['home', 'showScroll']),
	tagList: state.getIn(['home','tagList']),
	tagNextPage: state.getIn(['home','tagNextPage']),
	clicked: state.getIn(['home','clicked']),
	fixedSideBar: state.getIn(['home', 'fixedSideBar'])
});

const mapDispatch = (dispatch) => ({
	changeHomeData(tagID,key) {
		dispatch(actionCreators.getHomeInfo(tagID,key));
	},

	getTagPosts(tagID){
        dispatch(actionCreators.getTagPosts(tagID));
	},

	getMoreList(nextPage) {
		dispatch(actionCreators.getMoreList(nextPage))
	},
	deletePost(postID,tagID) {
		let confirmDelete = window.confirm('确认删除？')
		if (confirmDelete){
			dispatch(actionCreators.deletePost(postID,tagID))
		}else{
		return;
		}	
	},
	handleFixSideBar() {
		if (document.documentElement.scrollTop > 160||document.body.scrollTop > 160) {
			dispatch(actionCreators.toggleFixedSide(true))
		}else {
			dispatch(actionCreators.toggleFixedSide(false))
		}
	},
	handleChangeTagPage(tagNext){
		dispatch(actionCreators.changeTagPage(tagNext))
	},

	logOut(){
		dispatch(logActionCreators.logout())
	},
	clearFixed(){
		dispatch(actionCreators.clearFixed())
	}

});

export default connect(mapState, mapDispatch)(Home);
