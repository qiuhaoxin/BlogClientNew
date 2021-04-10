import React from 'react';
import Styles from './index.less';

function Actions({onActionClick,iconArr}){
    function handleClick(e){
        const target=e.target;
        const tagName=target.tagName;
        if(tagName && (tagName=='SPNA' || tagName=='I')){
            const iconType=target.getAttribute('data-id');
            onActionClick && onActionClick(iconType);
        }
        
    }

    return <div className={Styles.wrapper} onClick={handleClick}>
        {
            iconArr.map(item=>{
                return <span data-id={item.iconType} className={Styles.iconWrapper} key={item.key}>
                    <i data-id={item.iconType} className={item.iconClass}></i>
                </span>
            })
        }
    </div>
}

export default Actions;