import React from 'react';

import bgImage from '../../assets/bg4.jpg';
function BGroundImg(){
    console.log('xxxxx');
    return <div style={{backgroundImage:`url(${bgImage})`,width:'100%',height:'400px'}}>
    </div>
}

export default BGroundImg;