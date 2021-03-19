import React from 'react';
import Styles from './index.less';
import bgImage from '../../assets/bg4.jpg';

function BGroundImg(){
    return <div className={Styles.wrapper} style={{backgroundImage:`url(${bgImage})`}}>
        
    </div>
}

export default BGroundImg;