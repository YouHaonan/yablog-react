import React from 'react';
import moment from "moment";
import { delHtmlTag } from '../../../utils';
import { Link, withRouter } from 'react-router-dom';
import {
	ListItem, 
	ListInfo, 
	LoadMore,
	ListAddition,
	ListTag,
	ListTime,
	ListEdit,
	ListWrapper
 } from '../style';

const List=(props)=>{
	const { list, getMoreList, nextPage, token, deletePost } = props;
		return (
		<div>
			<ListWrapper>
			{list.map((item) => {
				return (
						<ListItem key={item.get('id')}>
							<ListInfo>
								<Link  to={'/detail/' + item.get('id')} className='itemLink'>
								<h3 className='title'>{item.get('title')}</h3>
								</Link>
								<ListAddition>
									<ListTime>
										< i className='iconfont'>&#xe790;</i>
										{moment(item.get('timestamp')).format('YYYY-MM-DD HH:mm:ss')}
									</ListTime>
									{item.get('tag_count')===0?'':
									<ListTag>
										<i className='iconfont'>&#xe637;</i>
										{item.get('tags').map((i) => i+' ')}
									</ListTag>}
									{token?
									<div>
										<ListEdit 
										onClick={()=>deletePost(item.get('id'), props.match.params.id)}>
											删除
										</ListEdit>
										<Link to={'/edit/' + item.get('id')}>
										<ListEdit>
											编辑
										</ListEdit>
										</Link>
									</div>
									:''}
								</ListAddition>
								<p className='body'>{delHtmlTag(item.get('body')).substr(0,256)+'...'}</p>
							</ListInfo>
						</ListItem>		
					)}
				)
			}
			</ListWrapper>
			{
			nextPage? 
			<LoadMore onClick={() => getMoreList(nextPage)}>显示更多</LoadMore>
			:
			<LoadMore>暂无更多</LoadMore>
			}
		</div>
		)
}	


export default(withRouter(List))