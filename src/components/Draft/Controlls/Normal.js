import React,{useState,Children,useEffect,useRef} from 'react';
import Styles from './normal.less';


function Normal({showText,children,style}){
    const [showChoose,setShowChoose]=useState(false);
    const [wrapperStyle,setWrapperStyle]=useState(null);
    const contentRef=useRef();
    function handleClick(){
        console.log();
        setShowChoose(true);
        setWrapperStyle({background:'#eee'})
    }
    function docFn(e){
        let target=e.target;
        let flag=false;
        while(target){
            if(target==contentRef.current){
                flag=true;
                break;
            };
            target=target.parentNode;
        }
        if(!flag){
           setShowChoose(false);
           setWrapperStyle({});
        }
    }
    useEffect(()=>{
        document.addEventListener('click',docFn);
        return ()=>{
            document.removeEventListener('click',docFn);
        }
    })
    return <div ref={contentRef} style={{...wrapperStyle,...style}} className={Styles.wrapper} onClick={handleClick}>
        <div style={{width:80}}>{showText}</div>
        <span className="triangle"></span>
        <div  style={{transform:showChoose ? `scale(1)` : `scale(0)`}} className={Styles.content}>
            {
                Children.only(children)
            }
        </div>
    </div>
}

export default Normal;