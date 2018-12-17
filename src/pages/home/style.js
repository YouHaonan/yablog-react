import styled from 'styled-components';

export const HomeWrapper = styled.div`
	width: 1100px;
	margin: 0 auto;
	overflow:hidden;
`;

export const HomeLeft = styled.div`
	float: left;
	margin-left: 15px;
	padding-top: 100px;
	width: 680px;
`;

export const HomeRight = styled.div`
	margin-top: 200px;
	width: 350px;
	float: right;
`;

export const ListWrapper = styled.div`
	overflow: hidden;
	min-height:150px;
`;

export const ListItem = styled.div`
	overflow: hidden;
	padding: 20px 0;
	border-bottom: 1px solid #dcdcdc;
`;

export const ListInfo =	styled.div`
	width: 680px;
	float: left;
	.title {
		line-height: 40px;
		font-size: 25px;
		font-weight: bold;
		color: #333;
	}
	.body {
		line-height: 30px;
		font-size: 16px;
		color: #999;
	}
	.itemLink{
		text-decoration: none;
	}
`;

export const ListAddition =	styled.div`
	line-height:30px;
	overflow:hidden;
	color:#999;
	font-size:13px;
	.iconfont{
		padding-right:5px;
	}

`;

export const ListTag =	styled.div`
	float:left;
	margin-left:20px;
`;

export const ListTime =	styled.div`
	float:left;
`;

export const ListEdit =	styled.div`
	cursor: pointer;
	float:right;
	margin-right:20px;
`;

export const LoadMore = styled.div`
	width: 100%;
	height: 40px;
	line-height: 40px;
	margin: 30px 0;
	background: #a5a5a5;
	text-align:center;
	border-radius: 20px;
	color: #fff;
	cursor: pointer;
`;

export const SideBarWrapper = styled.div`
	&.sidefixed{
		position:fixed;
		top:100px;
	}
`;

export const CategoryTitle = styled.div`
	width: 320px;
	line-height:36px;
	margin-bottom: 15px;
	font-size:36px;
	color:#666
	.iconfont{
		font-size:25px;
		padding-right:5px;
	}
`;

export const SearchMore = styled.span` 
	padding-top:10px;
	float: right;
    font-size: 16px;
	cursor :pointer;
	color:#666;
	.iconfont{
		font-size:16px;

`;	

export const CategoryItem = styled.span` 
    display: block;
    float: left;
    font-size: 14px;
    padding: 0 10px;
    line-height: 30px;
    border: 1px solid #ddd;
    color:#787878;
    border-radius: 5px;
    margin-right: 15px;
    margin-bottom: 15px;
	cursor :pointer;
`;

export const ItemWrapper = styled.div` 
	min-height:150px;
	position: relative;
	margin-top:30px;
	margin-left:20px;
    width: 320px;
	overflow: hidden;
	box-shadow: 0 0 8px rgba(0,0,0,0.2);
	padding: 20px 0 0 20px;
	box-sizing: border-box;
`;

export const Footer = styled.div`
	position:relative;
	margin-left:40px;
	margin-top:130px;
	.log{
		text-decoration: none;
	}
`;

export const FooterItem = styled.div`
	line-height:16px;
	color:#777;
	padding-top:15px;
	&.logout{
		cursor:pointer
	}
`;
