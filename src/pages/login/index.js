import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, Button } from './style';
import { actionCreators } from './store';
import { withRouter } from 'react-router-dom';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(e) {
    if (e.target.name === "username") {
      this.setState({
        username: e.target.value
      });
    } else if (e.target.name === "password") {
      this.setState({
        password: e.target.value
      });
    } else {
      // do nothing
    }
  };

  handleSubmit(){
    const username = this.state.username;
    const password = this.state.password;
    if (username.length === 0 || password.length === 0) {
      alert("用户名或密码不能为空！");
      return;
    }
    this.props.login(username, password);
  };
	render() {
    const { token } = this.props;
		if (!token) {
			return (
				<LoginWrapper>
					<LoginBox>
            <Input 
              placeholder='账户'
              name='username'
              type='text'
              value={this.state.username}
              onChange={this.handleChange}
            />
            <Input 
            placeholder='密码'
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            />
						<Button onClick={this.handleSubmit}>登录</Button>
					</LoginBox>
				</LoginWrapper>
			)
		}else {
			return <Redirect to='/'/>
		}
	}
}

const mapState = (state) => ({
	token: state.getIn(['login', 'token'])
})

const mapDispatch = (dispatch) => ({
	login(userName, passWord){
		dispatch(actionCreators.login(userName, passWord))
	}
})

export default connect(mapState, mapDispatch)(withRouter(Login));