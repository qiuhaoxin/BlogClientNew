import React,{useState,Children,useEffect,useRef} from 'react';
import Styles from './normal.less';

function MouseTip({visible}){
    console.log('tip visible is ',visible)
    return <div style={{display:visible ? 'block' : 'none'}} 
    className={Styles.tipWrapper}>

    </div>
}
function Normal({showText,children,style}){
    const [showChoose,setShowChoose]=useState(false);
    const [wrapperStyle,setWrapperStyle]=useState(null);
    const [tipVisible,setTipVisible]=useState(false);
    const contentRef=useRef();
    function handleClick(){
        console.log();
        setShowChoose(true);
        setWrapperStyle({background:'#eee'})
    }
    function handleMouseEnter(e){
       console.log("mouse enter")
       if(!showChoose){
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
    return <div ref={contentRef} style={{...wrapperStyle,...style}} 
    className={Styles.wrapper} onClick={handleClick}>
        <div style={{width:80}}    onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} >{showText}</div>
        <span className="triangle"></span>
        <MouseTip visible={tipVisible}/>
        <div  style={{transform:showChoose ? `scale(1)` : `scale(0)`}} className={Styles.content}>
            {
                Children.only(children)
            }
        </div>
    </div>
}

export default Normal;