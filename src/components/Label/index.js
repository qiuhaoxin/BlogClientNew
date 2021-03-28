import React,{useState} from 'react';
import Styles from './index.less';

//mode 0:纯展示  1:可以勾选
function Label({labelText='测试',canDel=false,mode=0,labelKey,onLabelDel,style,checked=false}){
    const [isChecked,setChecked]=useState(checked);
    function handleLabelClick(){
        if(mode==0)return;
        if(isChecked){
            setChecked(false);
        }else{
            setChecked(true);
        }
       
    }
    function handleDelLabel(){
         onLabelDel && onLabelDel(labelKey);
    }
    let styleObj={
        ...style,
        background:mode==0 ? '#0088ff' : '#fff',
        border:mode==1 ? '1px solid #eee' : '',
        color:mode==1 ? '#555' : '#fff',
        cursor:mode==1 ? 'pointer' : '',
    }
    if(isChecked){
        styleObj['background']="#0088ff";
        styleObj['border']='1px solid #0088ff';
        styleObj['color']='#fff';
    }
    return <span style={styleObj} className={Styles.wrapper} 
    onClick={handleLabelClick}>
         {labelText}
         <span className={Styles.del} onClick={handleDelLabel} style={{display:canDel?'inline-block':'none'}}></span>
    </span>
}

export default Label;