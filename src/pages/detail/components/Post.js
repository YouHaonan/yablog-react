import React from 'react';
import moment from "moment";
import { Link } from 'react-router-dom';

import {
	PostHeader, 
	Content,
	HeaderAddition,
	PostTime,
	PostTag,
	Footer,
    FooterTag,
    Edit
} from '../style';

const Post=(props)=> {
    const{post, tags, token}=props      
    return (
    <div>
        <PostHeader>
        {post.get('title')}
            <HeaderAddition>
                <PostTime>
                    <i className='iconfont'>&#xe790;</i>
                    {moment(post.get('timestamp')).format('YYYY-MM-DD HH:mm:ss')}
                </PostTime>
                {tags.get('count')===0? '':
                <PostTag>
                    <i className='iconfont'>&#xe637;</i>
                    {post.get('tags').map((i) => i+' ')}
                </PostTag>}
                {token?
                <Link to={'/edit/' + post.get('id')}>
                    <Edit >编辑</Edit>
                </Link>:''}
            </HeaderAddition>
        </PostHeader>
        <Content 
            dangerouslySetInnerHTML={{__html:post.get('body')}}
        />
        {tags.get('count')===0? 
        <Footer>相关标签：无</Footer>:
        <Footer>
            相关标签：
            {tags.get('tags').map((item)=>(
            <Link to={'/tags/' + item.get('id')}
            key={item.get('id')} 
            >
                <FooterTag >
                    {item.get('name')}
                </FooterTag>
            </Link>)
            )}
        </Footer>}
    </div>
    )
};

export default Post;