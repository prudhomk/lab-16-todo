import { Component } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

class Header extends Component {

  render() { 
    return (
      <header className="Header">

        <h1> Task Master </h1>


        <NavLink to="/todo-tracker"> ToDo Tracker</NavLink>
        
      </header>
    );
  }

}
 
export default Header;