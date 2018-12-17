import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import{ withRouter } from 'react-router-dom'
import BackTop from '../../common/backtop';
import Header  from '../../common/header/index';
import Post from './components/Post'
import Comments from './components/Comments'
import { 
	DetailWrapper,
    AddComment,
    AddCommentWrapper,
	SubmitCommentButton,
} from './style';

class Detail extends Component {
  state={ commentValue: ''}
	render() {
    const{ commentValue }=this.state
		return (
		<div>
			<Header/>
            <BackTop scrollTop='1500'/>
			<DetailWrapper>
                <Post {...this.props}/>
                <AddCommentWrapper>
                    <AddComment
                    value={commentValue}
                    onChange={this.handleCommentChange}
                    />
                    <SubmitCommentButton 
                    onClick={()=>this.handleCommentSubmit(this.props.post.get('id'))}>
                        评论
                    </SubmitCommentButton>
                </AddCommentWrapper>
                <Comments {...this.props}/>
			</DetailWrapper>
		</div>
		)
    }
  
    handleCommentChange = (e)=>{
        this.setState({commentValue:e.target.value})
    }

    handleCommentSubmit = (postID)=>{
		if (this.state.commentValue.length===0){
			alert('内容不能为空！')
			return;
		}else{
            this.props.submitComment(this.state.commentValue,postID)
            this.setState({commentValue:''})}
    }

	componentDidMount() {
		this.props.getDetail(this.props.match.params.id)
	}

	componentWillMount(){
		window.scrollTo(0,0)
	}
}

const mapState = (state) => ({
	activeID: state.getIn(['detail','activeID']),
	token: state.getIn(['login','token']),
	post: state.getIn(['detail', 'post']),
	tags:state.getIn(['detail', 'tags']),
	comments:state.getIn(['detail', 'comments']),
	nextComment:state.getIn(['detail', 'nextComment']),
	byIDList: state.getIn(['detail','byIDList']),
	replyContent:state.getIn(['detail','replyContent']),
	replyTo:state.getIn(['detail','replyTo']),
	toAdmin:state.getIn(['detail','toAdmin'])
});

const mapDispatch = (dispatch) => ({
	submitComment(comment,id){
		dispatch(actionCreators.submitComment(comment,id))
	},
	getDetail(id){
		dispatch(actionCreators.getDetail(id))
	},
	getMoreComment(nextComment){
		dispatch(actionCreators.getMoreComment(nextComment))
	},
	handleDeleteComment(id,token,url){
		let confirmDelete = window.confirm('确认删除？')
		if (confirmDelete){
			dispatch(actionCreators.deleteComment(id,token,url))
		}else{
		return;
		}
	},
	toggleComment(id,token,url){
		dispatch(actionCreators.toggleComment(id,token,url))
	},
	showReply(id,list){
		if (list.size===0){
			dispatch(actionCreators.getReply(id))
		}
		dispatch(actionCreators.showReply(id))
	},
	showReplyArea(id,preID,replyTo,toAdmin){
		dispatch(actionCreators.showReplyArea(id,preID, replyTo,toAdmin))
	},
	cancelReply(id){
		dispatch(actionCreators.cancelReply(id))
	},
	handleReplyChange(e){
		dispatch(actionCreators.replyChange(e.target.value))
	},
	handleReplySubmit(value,to,id,toAdmin){
		if (value.length===0){
			alert('内容不能为空！')
			return;}else{
		dispatch(actionCreators.replySubmit(value,to,id,toAdmin))
	}},
	getMoreReply(id, next){
		dispatch(actionCreators.getMoreReply(id, next))
	},
	toggleReply(replyID,token,commentID){
		dispatch(actionCreators.toggleReply(replyID,token,commentID))
	},
	handleDeleteReply(replyID,token,commentID){
		let confirmDelete = window.confirm('确认删除？')
		if (confirmDelete){
			dispatch(actionCreators.deleteReply(replyID,token,commentID))
		}else{
		return;
		}
	},
});

export default connect(mapState, mapDispatch)(withRouter(Detail));
