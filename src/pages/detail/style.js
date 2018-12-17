import styled from 'styled-components';

export const DetailWrapper = styled.div`
	overflow: hidden;
	width: 760px;
	margin: 0 auto;
	padding-bottom: 100px;
`;

export const PostHeader = styled.div`
	margin: 50px 0 20px 0;
	line-height: 44px;
	font-size: 34px;
	color: #333;
	font-weight: bold;
`;

export const HeaderAddition = styled.div`
	margin-top: 20px
	line-height:30px;
	overflow:hidden;
	color:#999;
	font-size:14px;
	.iconfont{
		padding-right:5px;
	}

`;

export const Edit = styled.div`
	float:right;
	padding-right:10px;
`;

export const Content = styled.div`
	color: ##2f2f2f;
	min-height:200px;
	line-height:20px;
	p{
		min-height:16px;
		white-space:pre-wrap;
	}
	img{
		width:100%;
	}
`;

export const Footer = styled.div`
	margin-top: 60px;
	font-size:22px;
	color: ##2f2f2f;
	line-height:35px;
`;

export const FooterTag = styled.span`
	line-height:20px;
	display:inline-block;
	background:#999;
	border-radius:3px;
	font-size: 14px;
	padding:3px 7px;
	margin-right: 15px;
	margin-bottom: 15px;
	color:white;
	cursor: pointer;
`;

export const CommentWrapper = styled.div`
	margin-top:60px;
	overflow:hidden;
`;

export const CommentLabel = styled.div`
	font-size:30px;
	line-height:30px;
	margin-bottom:50px;
`;


export const ListItem = styled.div`
	overflow: hidden;
	padding: 20px 0;
	border-top: 1px solid #dcdcdc;
	&.reply{
		padding:10px 0;
	}
`;

export const ReplyArea = styled.textarea.attrs({
    placeholder: '说说你的想法'
})` 
    font-family: inherit;
    padding: 8px;
    font-size:16px;
	display:block;
	margin-left:20px;
    margin-top:60px;
	margin-bottom:20px;
	box-sizing: border-box;
	width:620px;
    height:100px;
    resize:none;
    border:1 solid #dcdcdc;
	border-radius: 2px;
	
`;

export const ListInfo =	styled.div`
	overflow:hidden;
`;

export const Author = styled.div`
	fontsize:20px;
	color:#2f2f2f;
	padding:7px 0;
	&.reply{
		font-size:15px;
	}
`;

export const AuthorBadge =styled.span`
	display:inline-block;
	background:#0084ff;
	color:#fff;
	font-size:12px;
	padding:2px 4px;
	line-height:13px;
	border-radius:2px;
	margin-left:5px;
	text-align:center
`;

export const Operation = styled.div`
	display:inline-block
	float:right;
	cursor:pointer;
	padding-right:8px;
`;

export const Floor = styled.div`
	font-size:13px;
	color:#999;
	margin-bottom:20px;
	&.reply{
		margin-bottom:10px;
	}
`;

export const ListAddition =	styled.div`
overflow:hidden;
`;

export const CommentBody =	styled.div`
	line-height:30px;
	overflow:hidden;
	font-size:16px;
	padding-left:5px;
	margin-bottom:20px;
	&.reply{
		font-size:14px;
		line-height:20px;
		margin-bottom:10px;
		padding-left:5px;
	}
`;

export const ListFooter = styled.div`
	overflow:hidden;
	width:100%;
`;

export const FooterItem = styled.div`
	position:relative;
	float:right;
	color:#999;
	font-size:15px;
	margin-right:15px;
	cursor:pointer;
	&.reply{
		font-size:14px;
	}
	.iconfont{
		font-size:22px;
		position:absolute;
		top:-2px;
		right:35px;
		&.reply{
			font-size:19px;
		}
	}
	
`;

export const PostTag =	styled.div`
	float:left;
	margin-left:20px;
`;

export const MoreComment =	styled.div`
	width: 100%;
	height: 40px;
	line-height: 40px;
	margin: 30px 0;
	text-align:center;
	color: #999;
	cursor: pointer;
	&.reply{
		height:20px;
		line-height:20px;
		margin:10px 0;
		font-size:15px;
	}
`;

export const PostTime =	styled.div`
	float:left;
`;

export const AddCommentWrapper = styled.div`
	overflow:hidden;
`;

export const SubmitCommentButton = styled.div`
	float:right;
	cursor: pointer;
	height:30px;
	color: #fff;
	border-radius:3px;
	font-size:14px;
	line-height:20px;
	box-sizing: border-box;
	padding:5px 10px;
	text-align:center;
	background-color: #0084ff;
	&.reply{
		margin-right:125px;
		margin-bottom:20px;
		font-size:14px;
		height:28px;
		padding:4px 8px;
	}
`;

export const CancelButton = styled.div`
	float:right;
	cursor: pointer;
	height:39px;
	color: #999;
	font-size:15px;
	line-height:20px;
	padding:5px 10px;
	text-align:center;
`;

export const AddComment = styled.textarea.attrs({
    placeholder: '快来评论吧'
})` 
    font-family: inherit;
	padding: 8px;
    font-size:16px;
    display:block;
    margin-top:80px;
	margin-bottom:40px;
	box-sizing: border-box;
	width:760px;
    height:120px;
    resize:none;
    border:1 solid #dcdcdc;
	border-radius: 2px;
	
` 
export const ReplyWrapper = styled.div`
	overflow:hidden;
	width:620px;
	padding:25px;
	padding-bottom:10px;
	margin-top:50px;
	background:#eee;
	margin-left:20px;
	border-radius:4px;
	margin-bottom:20px;
	box-sizing: border-box;
`;

