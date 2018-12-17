import styled from 'styled-components';


export const ListWrapper = styled.div`
    position:relative;
    min-height:150px;
    width:800px;
    padding-top:80px;
    margin:0 auto;
`;

export const ListLabel = styled.div`
    position:relative;
    font-size:30px;
    font-weight:500;
    margin-bottom:40px;
`;
export const MessageBody = styled.div`
    font-size:14px;
    margin-left:10px;
    margin-bottom:20px;
`;

export const Badge = styled.div`
    position:relative;
    margin:0 5px;
    bottom:5px;
    height:26px;
    width:26px;
    line-height:26px
    border-radius:13px;
    display:inline-block;
    font-size:14px;
    text-align:center;
    color:#fff;
    background:#3194d0;
    font-weight:500;
`;


export const ListItem = styled.div`
    padding-top: 20px;
    padding-bottom:5px;
    border-bottom: 1px solid #dcdcdc;
    a{
        text-decoration: none;
    }
`;

export const ListTitle = styled.div`
    padding: 20px 0;
    .author{
        color:#175199
        font-weight:500;
    }
    .title{
        font-weight:bold;
    }
`;

export const ListTime = styled.div`
    font-size:13px;
    display:inline-block;
    color:#999;
    padding-left:10px;
`;

export const Replied =	styled.div`
    border-radius:5px;
    padding:10px;
    padding-left:15px;
    width:720px;
    margin:auto;
    background:#f4f4f4;
    color:#999;
    font-size:14px;
    box-sizing:border-box;
    line-height:20px;
`;

export const ListFooter = styled.div`
    overflow:hidden;
    padding-right:15px;
    padding-top:15px;
`;

export const FooterItem = styled.div`
    padding:0 5px;
    float:right;
    color:#999;
    font-size:13px;
    cursor:pointer;
`;

export const MoreMessage =styled.div`
	width: 100%;
	height: 40px;
	line-height: 40px;
	margin: 30px 0;
	text-align:center;
	color: #999;
	cursor: pointer;
`;