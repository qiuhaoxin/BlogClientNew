import React from 'react';
import Styles from './singleIcon.less';

function SingleIcon({iconName,blockType=null,inlineStyle=null,iconType,onToggleClick,iconStyle,disabled=false}){
    let flag=false;
    if(inlineStyle){
        //如果含有指定类型样式 图标呈选中样式
        flag=inlineStyle.has(iconType);
    }
    if(blockType && blockType==iconType){
        //如果块类型等于指定的类型 图标呈选中样式
        flag=true;
    }
    function handleIconClick(){
        if(disabled)return;
        onToggleClick && onToggleClick(iconType);
    }
    let iconStyleNew={
        ...iconStyle,
        color:disabled ? '#eee' : (flag ? 'blue':'#555'),
    }
    return <span className={Styles.iconWrapper} onClick={handleIconClick}>
        <i style={iconStyleNew} className={iconName}></i>
    </span>
}

export default SingleIcon;