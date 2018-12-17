import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link,withRouter } from 'react-router-dom';
import Header  from '../../common/header/index';
import moment from "moment";
import { actionCreators } from './store';
import BackTop from '../../common/backtop';
import { 
    ListLabel,
    ListWrapper,
    Replied,
    ListItem,
    ListTitle,
    ListTime,
    ListFooter,
    FooterItem,
    MoreMessage,
    Badge,
    MessageBody
} from './style';

class Message extends Component {
	render() {
        const { comments, replyNext,commentNext, count, token, getMoreMessage } =this.props
        if (token){
		return (
			<div>
                <Header/>
                <ListWrapper>
                    <ListLabel>
                        未读消息
                        <Badge>{count}</Badge>:
                    </ListLabel>
                    {comments.map(
                        item =>(
                    <ListItem key={item.get('id')}>
                        <ListTitle>
                        {item.get('author')}
                        <ListTime>{moment(item.get('timestamp')).format('YYYY-MM-DD HH:mm:ss')}</ListTime>
                        </ListTitle>
                        <MessageBody>
                            {item.get('body')}
                        </MessageBody>
                        <Link to={'/detail/'+item.get('post_id')}>
                        <Replied>{item.get('post_title')||item.get('comment_body')}</Replied>
                        </Link>
                        <ListFooter>
                            <FooterItem onClick ={()=> this.props.toggleStatus(item.get('id'),item.get('name'),token) }>
                                标为已读
                            </FooterItem>
                            <FooterItem onClick ={()=> this.props.deleteMessage(item.get('id'),item.get('name'),token)} >
                                删除
                            </FooterItem>
                        </ListFooter>
                    </ListItem>
                        )   
                    )}
                    {
                    commentNext||replyNext? 
                    <MoreMessage onClick={() => getMoreMessage(commentNext,replyNext, token)}>&gt;&gt;&gt; 更多消息 &lt;&lt;&lt;</MoreMessage>
                    :
                    <MoreMessage>&gt;&gt;&gt; 暂无更多 &lt;&lt;&lt;</MoreMessage>
                    }
                </ListWrapper>
                <BackTop scrollTop='800'/>
			</div>
		)}else{
            return(
                <Redirect to='/'/>
            )
        }
	}

	componentDidMount() {
        this.props.getUnreadMessage(this.props.token)
	}
	
}

const mapState = (state)=>({
    comments :state.getIn(['message','messages']),
    commentNext:state.getIn(['message', 'commentNext']),
    replyNext:state.getIn(['message', 'replyNext']),
    token: state.getIn(['login','token']),
    count: state.getIn(['message','count'])
})

const mapDispatch = (dispatch) => ({
    getUnreadMessage(token){
        dispatch(actionCreators.getUnreadMessage(token))
    },
    getMoreMessage(commentNext, replyNext,token){
        if(commentNext){
            dispatch(actionCreators.getMoreComment(commentNext,token))
        }if(replyNext){
        dispatch(actionCreators.getMoreReply(replyNext, token))
        }else{
            return;
        }
    },
    toggleStatus(id, name,token){
        dispatch(actionCreators.toggleStatus(id, name,token))
    },
    deleteMessage(id,name, token){
        let confirmDelete = window.confirm('确认删除？')
		if (confirmDelete){
			dispatch(actionCreators.deleteMessage(id, name,token))
		}else{
		return;
		}
    }

});

export default connect(mapState, mapDispatch)(withRouter(Message));
