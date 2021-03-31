//文本缩进
import React,{useState} from 'react';
import {toggleTextIndentStyles} from '../../../utils/EidtorUtils';
import PairIcon from './PairIcon';
const textIndentArr=[
    {iconName:'icon-right_indent',iconId:1,iconType:'rightIndent'},
    {iconName:'icon-left_indent',iconId:2,iconType:'leftIndent'}
];
function TextIndent({onToggle,editorState}){
    console.log("text indent editor state is ",editorState)
    function handleClick(){
        const nextEditorState=toggleTextIndentStyles({editorState});
        onToggle && onToggle(nextEditorState);
    }
    return <PairIcon iconArr={textIndentArr} onToggleClick={handleClick} iconStyle={{fontSize:18}} />
}

export default TextIndent;
