import React from 'react';
import Styles from './pairIcon.less';
import SingleIcon from './SingleIcon';

function PairIcon({iconArr,...restProps}){
    console.log("restProps is ",restProps);
    return <div className={Styles.wrapper}>
       {
           iconArr.map(item=>{
               console.log("single icon is ",item);
               return <SingleIcon iconName={item.iconName} key={item.iconId} {...restProps}/>
           })
       }
    </div>
}

export default PairIcon;