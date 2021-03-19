import Styles from './index.less';
import React,{useEffect,useState} from 'react';

import Nav from '../Nav';
import UserLogo from '../UserLogo';
import throttle from 'lodash.throttle';
function Header(){
   const [styleObj,setStyle]=useState(null);
   const [flag,setFlag]=useState(true);
   useEffect(()=>{
         const scrollEvent=throttle(function(e){
            const scrollTop=document.documentElement.scrollTop;
            if(scrollTop > 64 && flag){
               setStyle({
                  backgroundColor:'rgba(0, 0, 0, 0.6)',
               })
               setFlag(false);
            }
            if(scrollTop < 64){
               setFlag(true)
               setStyle({
                  backgroundColor: `rgba(0, 0, 0, 0)`,
               })
            }
         },100)
         document.addEventListener('scroll',scrollEvent);
         return ()=>{
            document.removeEventListener('scroll',scrollEvent);
         }
   })
   return <div style={styleObj} className={Styles.header}>
      <UserLogo />
      <Nav />
   </div>
}
export default Header;