import React from 'react';
import Styles from './lineheight.less';
import {toggleLineHeightStyles} from '../../../utils/EidtorUtils';
const lineHeightList=[
    1,
    1.2,
    1.5,
    1.75,
    2,
    2.5,
    3,
    4
]
function LineHeight({onToggle,editorState}){
    let currentFontSize=null;
    function handleClick(lineHeight){
        const nextEditorState=toggleLineHeightStyles({editorState,lineHeight});
        onToggle && onToggle(nextEditorState);
    }
    lineHeightList.find(item=>{
        const inlineStyle=editorState.getCurrentInlineStyle();
        const flag=inlineStyle.has(`LINEHEIGHT-${item.label}`);  //FONTSIZE-34
        if(flag){
            currentFontSize=item.label;
            return true;
        }
        return false;
    })
    return <ul className={Styles.wrapper}>
    {
        lineHeightList.map(item=><li className={Styles.titleItem} key={item} onClick={()=>handleClick(item)}>
            {
                React.createElement('span',{},item)
            }
        </li>)
    }
</ul>
}

export default LineHeight;