import React,{useState} from 'react';
import Styles from './singleIcon.less';
import TipContent from '../../TipContent';
function SingleIcon({iconName,blockType=null,inlineStyle=null,iconType,
    onToggleClick,iconStyle,disabled=false,tipText}){
    const [tipVisible,setTipVisible]=useState(false);
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
    function handleMouseEnter(e){
         setTipVisible(true);
     }
     function handleMouseLeave(){
         setTipVisible(false);
     }
    let iconStyleNew={
        ...iconStyle,
        color:disabled ? '#eee' : (flag ? 'blue':'#555'),
        cursor:disabled ? 'not-allowed' : 'pointer'
    }
    return <span className={Styles.iconWrapper} onClick={handleIconClick} onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave}>
        <i style={iconStyleNew} className={iconName}></i>
        <TipContent visible={tipVisible} tipText={tipText}/>
    </span>
}

export default SingleIcon;