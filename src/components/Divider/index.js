import React from 'react';
import Styles from './index.less';


function Divider({direction='vertical'}){
    return <div className={`${Styles[direction]} ${Styles['wrapper']}`}>

    </div>
}

export default Divider;