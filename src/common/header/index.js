import React from 'react';
import { actionCreators } from './store';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Link, withRouter } from 'react-router-dom';
import { 
    HeaderWrapper,
    NavHeader,
    Logo,
    Nav,
    NavItem,
    Addition,
    SearchWrapper,
    NavSearch

 } from './style';

 const Header = (props) =>{
    const {focused, handleInputFocus, token,inputValue,handleInputBlur,handleInputChange,handleSearch,handleKeyDown  } = props;
    return(
    <HeaderWrapper>
        <NavHeader>
            <Logo/>
            <Nav>
                <Link to='/'>
                    <NavItem className= 'left active'>首页</NavItem>
                </Link>
                {token?
                <div>
                <Link to='/newpost'>
                <NavItem className='right'>写文章</NavItem>
                </Link>
                <Link to='/message'>
                <NavItem className='right'>消息</NavItem>
                </Link>
                </div>
                 : null
                }
                <SearchWrapper>
                    <CSSTransition
                        in={focused}
                        timeout={200}
                        classNames="slide"
                    >
                        <NavSearch className = {focused? 'focused':''} 
                        onFocus = {handleInputFocus}
                        onBlur = {handleInputBlur}
                        onChange={handleInputChange}
                        onKeyDown={(e)=>handleKeyDown(props.history,inputValue,e)}
                        value={inputValue}
                        ></NavSearch>
                    </CSSTransition>
                            <i
                            onMouseDown ={()=>handleSearch(inputValue,props.history)}
                            className = {focused? 'iconfont focused': 'iconfont'}
                            >
                            &#xe614;
                            </i>
                </SearchWrapper>
            </Nav> 
            <Addition>
                <NavItem>
                    <a href='https://github.com/YouHaonan/yablog'>关于</a>
                </NavItem>                
            </Addition> 
        </NavHeader>
    </HeaderWrapper>
 );}


 const mapState = (state)=>({
    focused: state.getIn(['header','focused']),
    token:state.getIn(['login','token']),
    inputValue:state.getIn(['header','inputValue'])
});

const mapDispatch = (dispatch)=>({
    handleInputFocus(){
        dispatch(actionCreators.searchFocus());
    },

    handleInputBlur(){
        dispatch(actionCreators.searchBlur());
    },
    handleInputChange(e){
        dispatch(actionCreators.inputChange(e))
    },
    handleSearch(value, history){
        if (value.length===0){
            return;
        }else{
        history.push(`/search/${value}`)
        dispatch(actionCreators.searchPost(value))
    }},
    handleKeyDown(history,value,e){
        if (value.length===0){
            return;
        }
        else if (e.which === 13){
            history.push(`/search/${value}`)
            dispatch(actionCreators.searchPost(value))
        }else{
            return;
        }
    }

})


 export default connect(mapState,mapDispatch)(withRouter(Header));