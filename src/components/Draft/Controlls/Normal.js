import React,{useState,Children,useEffect,useRef} from 'react';
import Styles from './normal.less';
import DropDown from './DropDown';
import MouseTip from '../../TipContent';
function Normal({showText,children,tipText,style,render,dropDownVisible,onDropDownChange}){
    const [wrapperStyle,setWrapperStyle]=useState(null);
    const [tipVisible,setTipVisible]=useState(false);
    const contentRef=useRef();
    function handleClick(){
        onDropDownChange(true);
        setWrapperStyle({background:'#eee'})
    }
    function handleMouseEnter(e){
       if(!dropDownVisible){
        setTipVisible(true);
       }
       
    }
    function handleMouseLeave(){
        setTipVisible(false);
    }
    function docFn(e){
        let target=e.target;
        let flag=false;
        setTipVisible(false);
        while(target){
            if(target==contentRef.current){
                flag=true;
                break;
            };
            target=target.parentNode;
        }
        if(!flag){
           onDropDownChange(false);
           setWrapperStyle({});
        }
        
       
        
    }
    useEffect(()=>{
        document.addEventListener('click',docFn);
        return ()=>{
            document.removeEventListener('click',docFn);
        }
    })
    return <div ref={contentRef} style={{...wrapperStyle,...style}} 
           className={Styles.wrapper} >
        <div style={{width:90,paddingLeft:10}}    onMouseEnter={handleMouseEnter} 
             onMouseLeave={handleMouseLeave} onClick={handleClick}>
            {showText}
        </div>
        <span className="triangle"></span>
        <MouseTip tipText={tipText} visible={tipVisible}/>
        <DropDown visible={dropDownVisible}>
            {
                render()
            }
        </DropDown>
    </div>
}

export default Normal;