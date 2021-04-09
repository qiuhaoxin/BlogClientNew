import React from 'react';
import Styles from './index.less';
import Actions from '../Actions';
import Label from '../Label';
function LabelAndAction({labelList,onActionClick}){
    return <div className={Styles.wrapper}>
             <div className={Styles.labelList}>
             {
                labelList.map((item,index)=><Label key={index} labelText={item}/>)
             }
             </div>
             <Actions onActionClick={onActionClick}/>
    </div>
}

export default LabelAndAction;