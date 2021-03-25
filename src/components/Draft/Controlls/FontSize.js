import React from 'react';
import Styles from './fontsize.less';

const fontSizeList=[
    {label: '12', name:'12'},
    {label: '14', name:'14'},
    {label: '16', name:'16'},
    {label: '18', name:'18'},
    {label: '20', name:'20'},
    {label: '22', name:'22'},
    {label: '24', name:'24'},
    {label: '26', name:'26'},
    {label: '28', name:'28'},
    {label: '32', name:'32'},
    {label: '34', name:'34'},
    {label: '36', name:'36'},
];
function FontSize({onToggle,editorState}){
    let currentFontSize=null
    fontSizeList.find(item=>{
        const inlineStyle=editorState.getCurrentInlineStyle();
        const flag=inlineStyle.has(`FONTSIZE-${item.label}`);  //FONTSIZE-34
        if(flag){
            currentFontSize=item.label;
            return true;
        }
        return false;
    })
    return <ul className={Styles.wrapper}>
    {
        fontSizeList.map(item=><li className={Styles.titleItem} key={item.label} onClick={()=>onToggle("FONTSIZE-",item.label)}>
            {
                React.createElement('span',{},item.name)
            }
        </li>)
    }
</ul>

}


export default FontSize;