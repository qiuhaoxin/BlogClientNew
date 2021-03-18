import Styles from './index.less';
import React,{useEffect} from 'react';

import Nav from '../Nav';
import UserLogo from '../UserLogo';

function Header(){
   return <div className={Styles.header}>
      <UserLogo />
      <Nav />
   </div>
}

export default Header;