import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from '../home/Home';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import 'TodoTracker' from '../todo-tracker/TodoTracker';
import 'AuthPage' from '../auth/AuthPage';

class App extends Component {
  state = {
    token: window.localStorage.getItem('TOKEN')
  }

  handleUser = user => {
    window.localStorage.setItem('TOKEN', user.token);
    this.setState({ token: user.token });
  }

  render() {
    const { token } = this.state;


    return (
      <div className="App">
        <Router>
          <Header/>
          <main>

            <Switch>
              <Route path="/" exact={true}
                render={routerProps => (
                  <Home {...routerProps}/>
                )}
              />

              <Route path="/auth" exact={true}
                render={routerProps => (
                  <AuthPage {...routerProps}
                    onUser={this.handleUser}/>
                )}
              />

              <Route path="/todo-tracker" exact={true}
                render={routerProps => (
                  token
                    ? <todoTrackerPage {...routerProps}/>
                    : <Redirect to="auth"/>
                )}
              />


              <Redirect to="/" />

            </Switch>
          </main>
          <Footer/>
        </Router>
      </div>
    );
  }

}

export default App;
