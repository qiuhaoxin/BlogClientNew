import React from 'react';
import Styles from './index.less';
const menuData=[
    {
        name:'首页',
        key:'mainpage',
    },{
        name:'发表文章',
        key:'publish'
    },{
        name:'随手记',
        key:'mark'
    },{
        name:'关于',
        key:'about'
    }
]
function Nav(){
    return <ul className={Styles.wrapper}>
        {
            menuData.map(item=><li key={item.key}>
                {item.name}
            </li>)
        }
    </ul>
}

export default Nav;