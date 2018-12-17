import styled from 'styled-components';

export const TitleOutContainer = styled.div`
    height:44px;
    overflow:hidden;
    margin-bottom:70px;
`

export const PostTitle = styled.textarea.attrs({
    placeholder: '请输入标题'
})`
    height: 44px;
    min-height: 44px;
    display: block;
    width:102%;
    border: 0;
    font-size: 32px;
    line-height: 32px;
    font-weight: 600;
    outline: none;
    resize:none;
    font-family:inherit;
    padding-right:3%;
` 

export const PostWrapper = styled.div`
    width: 800px;
    margin: 0 auto; 
    padding-top: 70px;
    padding-bottom:30px;
`
export const EditorWrapper = styled.div`
    width:100%;
    overflow:hidden
`

export const Header = styled.div`
    position: relative;
    height: 56px;
    margin:0 auto;
    border-bottom: 1px solid #f0f0f0;
`;

export const NavHeader = styled.div`
    position: relative;
    height: 56px;
    width: 900px;
    margin:0 auto;
`;

export const NavItem = styled.div`
    cursor:pointer;
    color:#555;
    font-size:17px;
    line-height: 56px;
    padding: 0 ;
    &.left {
        float: left;
    }
    &.right{
        float: right;
    }
    &.active{
        color: #ea6f5a;
    }
`;

export const PostTags = styled.div`
    padding-top: 180px;
    font-size:25px;
` 
export const TagTextArea = styled.textarea.attrs({
    placeholder: '标签之间用逗号分离'
})` 
    font-family: inherit;
    padding: 8px;
    font-size:14px;
    display:block;
    margin-top:30px;
    margin-bottom:50px;
    width:100%;
    height:100px;
    resize:none;
    box-sizing: border-box;
    border:1 solid #dcdcdc;
    border-radius: 2px;
` 
