import React from 'react';
import { Link } from 'react-router-dom';
import {
	CategoryTitle,
	SearchMore,
	CategoryItem,
	ItemWrapper,
	SideBarWrapper,
	Footer,
	FooterItem
 } from '../style';

const SideBar = (props)=>{
	const{ tagList, tagNextPage, handleChangeTagPage, fixedSideBar,token, logOut }=props
		return (
			<SideBarWrapper className={fixedSideBar? 'sidefixed' : ''}>
				<CategoryTitle>
					<i className='iconfont'>&#xe607;</i>
					热门标签
					<SearchMore
					onClick={() => handleChangeTagPage(tagNextPage) }
					>
					<i className='iconfont'>&#xe794;</i>
					换一批
					</SearchMore>
				</CategoryTitle>
				<ItemWrapper>
					{tagList.map((item)=>(
						<Link to={'/tags/' + item.get('id')} key={item.get('id')}>
							<CategoryItem
							>
								{item.get('name')}
							</CategoryItem>
						</Link>
					))}					
				</ItemWrapper>
				<Footer>
				{token?
					<FooterItem 
					onClick={logOut}
					className='logout'
					>Logout
					</FooterItem>:
					<Link to='/login' className='log'>
						<FooterItem>Login</FooterItem>
					</Link>
					}
					<FooterItem>Powered by 阿里云</FooterItem>
					<FooterItem>Python · Flask · React</FooterItem>
					<FooterItem>Copyright © Ya Blog 2018</FooterItem>
				</Footer>
			</SideBarWrapper>
		)
}

export default SideBar;