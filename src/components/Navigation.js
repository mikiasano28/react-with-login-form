import React, { useContext } from 'react';

import AuthContext from '../store/auth-context';
import classes from './Navigation.module.css';

// propsのバケツリレーを防ぐにはuseContextが使える
// useRef: DOMを操作する時、ex) e.target.value -> 例えばinput要素のvalue属性が取得できる
// isLoggedIn -> MainHeader.jsの属性から来ている

const Navigation = () => {
 const ctx =  useContext(AuthContext);

  return (
  //  <AuthContext.Consumer>
  //   {(ctx) => {
  //     return (
  //       <nav className={classes.nav}>
  //       <ul>
  //         {ctx.isLoggedIn && (
  //           <li>
  //             <a href="/">Users</a>
  //           </li>
  //         )}
  //         {ctx.isLoggedIn && (
  //           <li>
  //             <a href="/">Admin</a>
  //           </li>
  //         )}
  //         {ctx.isLoggedIn && (
  //           <li>
  //             <button onClick={ctx.onLogout}>Logout</button>
  //           </li>
  //         )}
  //       </ul>
  //     </nav>  
  //     );
  //   }}
  // </AuthContext.Consumer>

  <nav className={classes.nav}>
  <ul>
    {ctx.isLoggedIn && (
      <li>
        <a href="/">Users</a>
      </li>
    )}
    {ctx.isLoggedIn && (
      <li>
        <a href="/">Admin</a>
      </li>
    )}
    {ctx.isLoggedIn && (
      <li>
        <button onClick={ctx.onLogout}>Logout</button>
      </li>
    )}
  </ul>
</nav>  
  );
};

export default Navigation;