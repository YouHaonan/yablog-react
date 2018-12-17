import styled from 'styled-components';
import logoPic from '../../statics/logo.png';

export const HeaderWrapper = styled.div`
    position: relative;
    height: 56px;
    margin:0 auto;
    border-bottom: 1px solid #f0f0f0;
`;

export const NavHeader = styled.div`
    position: relative;
    height: 56px;
    width: 1300px;
    margin:0 auto;
`;

export const Logo = styled.div`
    position:absolute;
    top:0;
    left:0;
    padding:0;
    width: 100px;
    height: 56px;
    background: url(${logoPic});
    background-size: contain;
`;

export const Nav = styled.div`
    width:900px;
    height: 56px;
    margin:0 200px;
`;

export const NavItem = styled.div`
    color:#969696;
    font-size:17px;
    line-height: 56px;
    padding: 0 30px;
    a{
        text-decoration: none;
        color:#969696;
    }
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

export const Addition = styled.div` 
    position: absolute;
    top:0;
    right:0;
    height: 56px;
`;

export const SearchWrapper = styled.div`
float: left;
position: relative;
.iconfont{
    position: absolute;
    cursor:pointer;
    right: 5px;
    bottom: 4px;
    width: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    &.focused{
        background: #777;
        color: #fff;
    }
}

`;

export const NavSearch = styled.input.attrs({
    placeholder: '搜索'
})`
width: 160px;
height: 38px;
margin-top: 9px;
margin-left: 100px;
padding: 0  30px 0 20px;
box-sizing: border-box;
border: none;
outline: none;
border-radius: 19px;
background: #eee;
font-size: 14px;
color: #666;
&::placeholder{
    color:#999;
}

&.focused{
    width: 240px;
}

&.slide-enter{
    width: 160px;
}

&.slide-enter-active{
    width: 240px;
    transition: all .2s ease-out;
}

&.slide-exit{
    width:240px;
}

&.slide-exit-active{
    width: 160px;
    transition: all .2s ease-out;
}

;`