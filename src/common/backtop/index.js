import React, { Component } from 'react';
import styled from 'styled-components';

const Backtop = styled.div`
	background: #fff;
	border-radius: 4px;
	width: 40px;
	height: 40px;
	box-shadow: 0 0 8px rgba(0,0,0,0.2);
	position: fixed;
	right:60px;
	bottom:60px;
	line-height: 40px;
	text-align: center;
	font-size: 14px;
	cursor: pointer;
`

class BackTop extends Component{
    constructor(props){
        super(props);
        this.state = {showScroll:false}
		this.handleScrollTop = this.handleScrollTop.bind(this)
		this.changeScrollTopShow = this.changeScrollTopShow.bind(this)
		
    }

    handleScrollTop() {
		let timer = null;
		cancelAnimationFrame(timer);
		timer = requestAnimationFrame(function fn(){
			let oTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(oTop > 0){
				window.scrollTo(0,oTop-100);
				timer = requestAnimationFrame(fn);
			}else{
				cancelAnimationFrame(timer);
			}    
		});
    }
    
    bindEvents() {
		window.addEventListener('scroll', this.changeScrollTopShow);
	}

    changeScrollTopShow() {
		if (document.documentElement.scrollTop > this.props.scrollTop|| document.body.scrollTop > this.props.scrollTop) {
			this.setState({showScroll:true})
		}else {
			this.setState({showScroll:false})
		}
	}

    componentDidMount() {
		this.bindEvents();
    }
    componentWillUnmount() {
		window.removeEventListener('scroll', this.changeScrollTopShow);
    }

    render(){
        return(
            <div>
            {
            this.state.showScroll ?
            <Backtop onClick={this.handleScrollTop}>
            <i className='iconfont'>&#xe62d;</i>
            </Backtop>:null
            }
            </div> 
        )
    }
}

export default BackTop;

