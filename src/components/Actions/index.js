import React from 'react';
import Styles from './index.less';

function Actions({onActionClick}){
    function handleClick(){
        onActionClick && onActionClick('delete')
    }
    return <div className={Styles.wrapper}>
        <span>
            <i onClick={handleClick} className="icon-delete"></i>
        </span>
    </div>
}

export default Actions;