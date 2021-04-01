import React from 'react';
import Styles from './pairIcon.less';
import SingleIcon from './SingleIcon';

function PairIcon({iconArr,...restProps}){
  
    return <div className={Styles.wrapper}>
       {
           iconArr.map(item=>{
             
               return <SingleIcon {...item} iconName={item.iconName} key={item.iconId} {...restProps}/>
           })
       }
    </div>
}

export default PairIcon;