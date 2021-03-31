import React from 'react';
import Styles from './fontsize.less';
import {toggleLetterSpaceStyles} from '../../../utils/EidtorUtils';
import Normal from './Normal';
import wrapWithComponent from './Wrapper'
const letterSpaceArr=[
    0,
    1,
    2,
    3,
    4,
    5,
    6,
]
function LetterSpace({onToggle,editorState,onDropDownChange}){
    function handleClick(letterSpace){
        const nextEditorState=toggleLetterSpaceStyles({editorState,letterSpace});
        onToggle && onToggle(nextEditorState);
        onDropDownChange && onDropDownChange(false);
    }
    return <ul className={Styles.wrapper}>
    {
        letterSpaceArr.map(item=><li className={Styles.titleItem} key={item} onClick={()=>handleClick(item)}>
            {
                React.createElement('span',{},item)
            }
        </li>)
    }
</ul>

}
LetterSpace.displayName="LETTERSPACE";

export default wrapWithComponent(Normal,LetterSpace,{
    showText:'字间距',
    childrenSourceData:letterSpaceArr,
});