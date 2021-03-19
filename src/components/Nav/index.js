import React from 'react';
import Styles from './index.less';
import RouterData from '../../common/routerData';
import {withRouter} from 'react-router-dom';
function Nav(props){
    function itemClick(item){
        const {history}=props;
        history.push(item.path);
    }
    return <ul className={Styles.wrapper}>
        {
            RouterData.map(item=><li key={item.path} onClick={()=>itemClick(item)}>
                {item.name}
            </li>)
        }
    </ul>
}

export default withRouter(Nav);