import React,{useState,useRef} from 'react';
import Styles from './index.less';
import Label from '../Label'

function LabelInput(){
    const inputRef=useRef();
    const [labelList,setLabelList]=useState([]);
    function handleMouseDown(e){
        const keyCode=e.keyCode;

        if(keyCode==13 && inputRef.current.value){
            const value=inputRef.current.value;
            console.log('vaule is ',value);
            let tempList=labelList.slice();
            tempList.push({
                id:Date(),
                name:value,
            });
            inputRef.current.value='';
            setLabelList(tempList);
        }
    }
    function handleLabelDel(labelKey){
        const tempLabelList=labelList.slice();

        
        const idx=tempLabelList.findIndex(item=>item.id==labelKey);
        tempLabelList.splice(idx,1);
        setLabelList(tempLabelList);
    }
    function handleFocus(){
        if(inputRef.current){
            inputRef.current.focus();
        }
    }
    return <div className={Styles.wrapper} onClick={handleFocus}>
        <div className={Styles.labelList}>
            {
               labelList.map(item=><Label onLabelDel={handleLabelDel} canDel={true} labelKey={item.id} key={item.id} labelText={item.name} mode={0}></Label>)
            }
        </div>
        <input ref={inputRef} placeholder="请输入" onKeyDown={handleMouseDown}/>
    </div>
}

export default LabelInput;