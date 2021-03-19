
import React from 'react';
import Styles from './index.less';

import AppCard from '../../components/AppCard';
const labelList=[
    {key:'webpack',name:'webpack'},
    {key:'gch',name:'工程化'}
];
const appList=[
    {
        key:1,
        title:'测试title',
        appDes:'主题描述主题描述主题描述主题描述',
        labelList,
    },
    {
        key:2,
        title:'测试title',
        appDes:'主题描述主题描述主题描述主题描述',
        labelList,
    },
    {
        key:3,
        title:'测试title',
        appDes:'主题描述主题描述主题描述主题描述',
        labelList,
    }
]
class MainPage extends React.Component{
    
    render(){
       return <div className={Styles.wrapper}>
          <div className={Styles.innerWrapper}>
              {
                  appList.map(item=><AppCard key={item.key} {...item}></AppCard>)
              }
          </div>
       </div>
    }
}
export default MainPage;