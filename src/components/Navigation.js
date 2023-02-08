import React from 'react';

import classes from './Navigation.module.css';

// propsのバケツリレーを防ぐにはuseContextが使える
// useRef: DOMを操作する時、ex) e.target.value -> 例えばinput要素のvalue属性が取得できる
// isLoggedIn -> MainHeader.jsの属性から来ている

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;