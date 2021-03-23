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
    return <div className={Styles.wrapper}>
        <div>
            {
               labelList.map(item=><Label key={item.id} labelText={item.name} mode={0}></Label>)
            }
        </div>
        <input ref={inputRef} placeholder="请输入" onKeyDown={handleMouseDown}/>
    </div>
}

export default LabelInput;