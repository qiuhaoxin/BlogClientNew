import React,{Children} from 'react';
import Styles from './dropdown.less';

function DropDown({children,visible}){
    //style={{transform:showChoose ? `scale(1)` : `scale(0)`}}
    return <div style={{transform:visible ? `scale(1)` : `scale(0)`}} className={Styles.wrapper}>
    {
        Children.only(children)
    }
</div>
}

export default DropDown;