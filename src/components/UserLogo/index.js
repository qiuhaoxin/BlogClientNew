import React from 'react';
import Styles from './index.less';
import Logo from '../../assets/logo.jpg';
function UserLogo(){

    return <div className={Styles.wrapper}>
        <img className={Styles.logo} src={Logo}/>
        <span>邱浩新的博客空间</span>
    </div>
}
export default UserLogo;