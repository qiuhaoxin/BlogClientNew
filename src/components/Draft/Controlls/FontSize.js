import React from 'react';
import Styles from './fontsize.less';
import {toggleFontSizeStyles} from '../../../utils/EidtorUtils';
import Normal from './Normal';
import wrapWithComponent from './Wrapper'
const fontSizeArr=[
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    32,
    34,
    36,
]
function FontSize({onToggle,editorState,onDropDownChange,curVal}){
    function handleClick(fontSize){
        const nextEditorState=toggleFontSizeStyles({editorState,fontSize});
        onToggle && onToggle(nextEditorState);
        onDropDownChange && onDropDownChange(false);
    }
    return <ul className={Styles.wrapper}>
    {
        fontSizeArr.map(item=><li className={`${Styles.titleItem}`} key={item} onClick={()=>handleClick(item)}>
            {
                React.createElement('span',{},item)
            }
        </li>)
    }
</ul>

}
FontSize.displayName="FONTSIZE";

export default wrapWithComponent(Normal,FontSize,{
    showText:'字号',
    childrenSourceData:fontSizeArr,
});