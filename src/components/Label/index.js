import React from 'react';
import Styles from './index.less';


function Label({labelText='测试'}){
    return <span className={Styles.wrapper}>
         {labelText}
    </span>
}

export default Label;