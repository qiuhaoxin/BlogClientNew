
import React,{useState} from 'react';
import Styles from './codepen.less';
import TipContent from '../../TipContent';
import {toggleAddCodePen} from '../../../utils/EidtorUtils';
import {exactSrcFromScript} from '../../../utils';
import SingleIcon from './SingleIcon';
function CodePen({editorState,onToggle}){
    let tipText="添加CodePen";
    const [tipVisible,setTipVisible]=useState(false);
    function handleClick(){
        const codePenStr=`
        <p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="qiuhaoxin" data-slug-hash="VwPQwgJ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="position">
            <span>See the Pen <a href="https://codepen.io/qiuhaoxin/pen/VwPQwgJ">
            position</a> by qiuhaoxin (<a href="https://codepen.io/qiuhaoxin">@qiuhaoxin</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
        </p>
        <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
        `
   
        const srcInfo=exactSrcFromScript(codePenStr);
        const nextEditorState=toggleAddCodePen(editorState,{
            codeFragment:codePenStr,
            srcInfo,
        });
        if(nextEditorState){
            onToggle && onToggle(nextEditorState);
        }
    }
    return <div className={Styles.wrapper}>
        <span onClick={handleClick}>
            <i className={'icon-codepen'}></i>
        </span>
        <TipContent visible={tipVisible} tipText={tipText}></TipContent>
    </div>
}

export default CodePen;