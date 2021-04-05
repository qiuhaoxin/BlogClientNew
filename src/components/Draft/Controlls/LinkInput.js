import React,{useState} from 'react';
import Styles from './linkinput.less';


function InputLink({visible,onVisible}){
    const [linkStr,setLinkStr]=useState('ee');
    function handleBtnClick(e){
        const target=e.target;
        const dataIdAttr=target.getAttribute('data-id');
        console.log('data id attr is ',dataIdAttr);
        if(dataIdAttr=='cancel'){
            onVisible && onVisible(false);
        }else if(dataIdAttr=='sure'){
            const emptyReg=/^\s*$/;
            const result=emptyReg.test(linkStr);
            if(result){
                console.error("链接不能为空！")
                return;
            }
            onVisible && onVisible(false);
        }
    }
    function handleInputChange(e){
        const target=e.target;
        const inputValue=target.value;
        console.log("inputvalue is ",inputValue);
        setLinkStr(inputValue);
    }
    // style={{display:visible ? 'block' : 'none'}}
    //style={{display:visible ? 'transform:scale(1)' : 'transform:scale(0)'}}
    return <div className={Styles.wrapper} 
    style={{transform:visible ? 'scale(1)' : 'scale(0)'}}>
        <div className={Styles.innerWrapper}>
            <input value={linkStr} onChange={handleInputChange} placeholder="请输入链接地址" />
        </div>
        <footer onClick={handleBtnClick}>
            <button  data-id="cancel" className={Styles.cancel}>取消</button>
            <button data-id="sure" className={Styles.sure}>确定</button>
        </footer>
    </div>
}
export default InputLink;