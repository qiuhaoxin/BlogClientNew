import React from 'react';
import Styles from './singleIcon.less';

function SingleIcon({iconName,onToggleClick,disabled}){
    function handleIconClick(){
        onToggleClick && onToggleClick();
    }
    return <span className={Styles.iconWrapper} onClick={handleIconClick}>
        <i className={iconName}></i>
    </span>
}

export default SingleIcon;