import React from 'react';
import moment from "moment";

import { 
	CommentWrapper,
	CommentLabel,
	ListInfo,
	ListAddition,
	ListItem,
	Author,
	Floor,
	CommentBody,
	ListFooter,
    MoreComment,
    AuthorBadge,
    Operation,
    ReplyWrapper,
    FooterItem,
    ReplyArea,
    SubmitCommentButton,
    CancelButton
} from '../style';

const Comments =(props)=> {
    const{
        comments,nextComment, token,post,activeID, replyContent,toAdmin,replyTo,
        getMoreComment,handleDeleteComment,handleReplyChange,handleReplySubmit,
        toggleComment,showReply,byIDList,showReplyArea, cancelReply,getMoreReply,
        toggleReply,handleDeleteReply
    }=props
	return (
        <CommentWrapper>
            {comments.size===0? 
            <CommentLabel>
                暂无评论
            </CommentLabel>:
            <div>
                <CommentLabel>
                    评论：
                </CommentLabel>
                {comments.map(item=>(
                <ListItem key={item.get('id')}>
                    <ListInfo>
                        <ListAddition>
                            <Author>{item.get('author')}
                            {item.get('from_admin')?
                            <AuthorBadge>作者</AuthorBadge>:''}
                            </Author>
                            <Floor>
                            {`${item.get('floor')}楼  ${moment(item.get('timestamp')).format('YYYY-MM-DD HH:mm')}`}
                            {token && !item.get('is_read')?
                            <Operation onClick={()=>toggleComment(item.get('id'),token,post.get('comments_url'))}>
                                标为已读</Operation>:''}
                            {token?
                            <Operation onClick={()=>handleDeleteComment(item.get('id'),token,post.get('comments_url'))}>
                                删除
                            </Operation>:''}
                            </Floor>
                        </ListAddition>
                        <CommentBody>
                            {item.get('body')}
                        </CommentBody>
                        {!byIDList.getIn([`${item.get('id')}`,'show']) || byIDList.getIn([`${item.get('id')}`,'count'])===0?'':               
                            <ReplyWrapper >
                            {byIDList.getIn([`${item.get('id')}`,'replyList']).map(item=>(
                                <ListItem 
                                key={item.get('id')}
                                className='reply'>
                                    <ListAddition>
                                        <Author className='reply'>
                                            {item.get('author')}<span style={{color:'#8590a6'}}> 回复 </span>{item.get('to')}
                                        </Author>
                                        <Floor className='reply'>
                                            {moment(item.get('timestamp')).format('YYYY-MM-DD HH:mm')}
                                            {token && !item.get('is_read')?
                                            <Operation onClick={()=>toggleReply(item.get('id'),token,item.get('comment_id'))}>
                                                标为已读 
                                            </Operation>:''}
                                            {token?
                                            <Operation onClick={()=>handleDeleteReply(item.get('id'),token,item.get('comment_id'))}>
                                                删除 
                                            </Operation>:''}
                                        </Floor>
                                    </ListAddition>
                                    <CommentBody className='reply'>
                                        {item.get('body')}
                                    </CommentBody>
                                    <ListFooter>
                                        <FooterItem className='reply'
                                        onClick={()=>showReplyArea(item.get('comment_id'),activeID,item.get('author'),item.get('from_admin'))}
                                        >
                                        <i className= 'iconfont reply'>&#xe61e;</i>
                                            回复
                                        </FooterItem>
                                    </ListFooter>
                                </ListItem>
                        ))}
                        {
                        byIDList.getIn([`${item.get('id')}`,'next'])? 
                        <MoreComment 
                        className='reply'
                        onClick={() => getMoreReply(item.get('id'),byIDList.getIn([`${item.get('id')}`,'next']))}>
                        更多评论
                        </MoreComment>
                        :<MoreComment
                        className='reply'
                        >暂无更多</MoreComment>
                        }
                        </ReplyWrapper>
                        }
                        {byIDList.getIn([`${item.get('id')}`,'showReplyArea'])?
                        <div>
                        <ReplyArea
                        onChange={handleReplyChange}
                        value={replyContent}
                        />
                        <SubmitCommentButton 
                        onClick={()=>handleReplySubmit(replyContent,replyTo,activeID,toAdmin)}
                        className='reply'
                        >
                            评论
                        </SubmitCommentButton> 
                        <CancelButton onClick={()=>cancelReply(item.get('id'))}>
                            取消
                        </CancelButton>
                        </div>:''}
                        <ListFooter>
                            {byIDList.getIn([`${item.get('id')}`,'count'])===0?'':
                            <FooterItem onClick = {()=>showReply(item.get('id'),
                            byIDList.getIn([`${item.get('id')}`,'replyList']))}>
                                {byIDList.getIn([`${item.get('id')}`,'show'])? '收起评论':'查看评论'}
                            </FooterItem>}
                            <FooterItem 
                            onClick={()=>showReplyArea(item.get('id'),activeID,item.get('author'),item.get('from_admin'))}
                            >
                                <i className= 'iconfont'>&#xe61e;</i>
                                回复
                            </FooterItem>
                        </ListFooter>
                    </ListInfo>
                    
                </ListItem>
                    )
                )}
                {
                nextComment? 
                <MoreComment onClick={() => getMoreComment(nextComment)}>&gt;&gt;&gt; 更多评论 &lt;&lt;&lt;</MoreComment>
                :
                <MoreComment>&gt;&gt;&gt; 暂无更多 &lt;&lt;&lt;</MoreComment>
                }
            </div>}
        </CommentWrapper>		
	)
}

export default Comments;