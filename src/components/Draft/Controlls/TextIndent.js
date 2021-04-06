//文本缩进
import React,{useState} from 'react';
import {toggleIncreaseTextIndentStyles,getSelectionBlockData,toggleDecreaseTextIndentStyles} from '../../../utils/EidtorUtils';
import PairIcon from './PairIcon';
const initTextIndentArr=[
    {iconName:'icon-right_indent',iconId:1,iconType:'rightIndent',disabled:false,tipText:'增加缩进'},
    {iconName:'icon-left_indent',iconId:2,iconType:'leftIndent',disabled:false,tipText:'减少缩进'}
];
function TextIndent({onToggle,editorState}){
    const hasTextIndent=getSelectionBlockData(editorState,"textIndent");
    const [textIndentArr,setTextIndentArr]=useState(initTextIndentArr);
    console.log("TextIndent has text indent ?",hasTextIndent);
    // if(hasTextIndent==0){
    //     setTextIndentArr([
    //         {iconName:'icon-right_indent',iconId:1,iconType:'rightIndent',disabled:true},
    //         {iconName:'icon-left_indent',iconId:2,iconType:'leftIndent',disabled:true}
    //     ])
    // }
    function handleClick(iconType){
        let nextEditorState=null;
        if(iconType=='leftIndent'){
            nextEditorState=toggleDecreaseTextIndentStyles({editorState});
        }else{
            nextEditorState=toggleIncreaseTextIndentStyles({editorState});
        }
        if(nextEditorState){
            onToggle && onToggle(nextEditorState);
        }
       
    }
    return <PairIcon iconArr={textIndentArr} onToggleClick={handleClick} iconStyle={{fontSize:18}} />
}

export default TextIndent;
