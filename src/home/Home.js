import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default class Home extends Component {
  
  render() {
    return (
      <div className="Home">
        <h2>What Todo?</h2>

        <Link to='/auth'>Signing up or Logging in?</Link>
      </div>
    );
  }

}