/**
 * 提示框 鼠标移上样式
 */
import React from 'react';
import Styles from './index.less';

function TipContent({visible,tipText='标题'}){
    return <div className={Styles.tipWrapper} style={{display:visible ? 'block' : 'none'}} >
         {tipText}
    </div>
}

export default TipContent;