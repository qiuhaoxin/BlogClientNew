import React from 'react';
import Styles from './lineheight.less';
import {toggleLineHeightStyles} from '../../../utils/EidtorUtils';
import wrapWithComponent from './Wrapper';
import Normal from './Normal';
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
function LineHeight({onToggle,editorState,onDropDownChange}){
    function handleClick(lineHeight){
        const nextEditorState=toggleLineHeightStyles({editorState,lineHeight});
        onToggle && onToggle(nextEditorState);
        onDropDownChange && onDropDownChange(false);
    }
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

// export default LineHeight;

LineHeight.displayName="LINEHEIGHT";

export default wrapWithComponent(Normal,LineHeight,{
    showText:'行高',
    childrenSourceData:lineHeightList,
});