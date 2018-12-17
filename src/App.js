import React, { Component } from 'react';
import { GlobalStyle } from './style';
import { BrowserRouter, Route,Switch} from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail/loadable';
import Login from './pages/login/loadable';
import Editor from './pages/edit/loadable';
import Message from './pages/message/loadable';
import NotFound from './pages/notfound'
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div>
        <GlobalStyle/>
        <BrowserRouter>
          <Switch>
              <Route path='/' exact component={Home}></Route>
              <Route path='/search/:key' exact component={Home}></Route>
              <Route path='/edit/:id' exact component={Editor}></Route>
              <Route path='/newpost' exact component={Editor}></Route>
              <Route path='/message' exact component={Message}></Route>
              <Route path='/detail/:id' exact component={Detail}></Route>
              <Route path='/tags/:id' component={Home}></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/'  component={NotFound}></Route>
          </Switch>
        </BrowserRouter>
      </div>
      </Provider>
    );
  }
}

export default App;
