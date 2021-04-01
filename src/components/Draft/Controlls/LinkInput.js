import React from 'react';
import Styles from './linkinput.less';


function InputLink({visible}){
    
    // style={{display:visible ? 'block' : 'none'}}
    return <div className={Styles.wrapper}>
        <div className={Styles.innerWrapper}>
            <input placeholder="请输入链接地址" />
        </div>
        <footer>
            
        </footer>
    </div>
}
export default InputLink;