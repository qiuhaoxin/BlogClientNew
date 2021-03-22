import React,{useState} from 'react';
import Styles from './index.less';
import RouterData from '../../common/routerData';
import {withRouter} from 'react-router-dom';
const routerData=RouterData.filter(item=>item.showAsNav);
function Nav(props){
    const [curNav,setNav]=useState(routerData[0].path);
    function itemClick(item){
        const {history}=props;
        setNav(item.path)
        history.push(item.path);
    }
    return <ul className={Styles.wrapper}>
        {
            routerData.map(item=><li key={item.path} className={Styles[item.path==curNav ? 'active' : 'normal']} 
            onClick={()=>itemClick(item)}>
                {item.name}
            </li>)
        }
    </ul>
}

export default withRouter(Nav);