import React ,{Fragment}from 'react';
import { Route, Switch } from 'react-router-dom';
// import Login from './containers/Login';
import Home from './components/homePage/home';
import Toolbar from './components/toolbar/toolbar';
import UserPage from './components/userPage/user';
import LoginPage from './components/loginPage/login';
import SignupPage from './components/signUpPage/signup';
import Currency from './components/currencies/currency';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
  
      // <main>    
      <Fragment>
        <Toolbar />
              <Switch>
                  <Route path="/" component={Home} exact />
                  <Route path="/user" component={UserPage}  />
                  <Route path="/login" component={LoginPage}  />
                  <Route path="/signup" component={SignupPage}  />
                  <Route path="/currencies" component={Currency}  />                                                   
              </Switch>
      </Fragment>
    );
  }
  
  export default App;
