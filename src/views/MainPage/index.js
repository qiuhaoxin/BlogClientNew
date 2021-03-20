
import React from 'react';
import Styles from './index.less';

import AppCard from '../../components/AppCard';
import {connect} from 'react-redux';
import Actions from '../../actions';
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
    },
    {
        key:4,
        title:'测试title',
        appDes:'主题描述主题描述主题描述主题描述',
        labelList,
    },
    {
        key:5,
        title:'测试title',
        appDes:'主题描述主题描述主题描述主题描述',
        labelList,
    },
    {
        key:6,
        title:'测试title',
        appDes:'主题描述主题描述主题描述主题描述',
        labelList,
    }
]
class MainPage extends React.Component{
    
    componentDidMount(){
        const {dispatch}=this.props;
        dispatch({
            type:Actions.GET_ARTICLE_LIST,
            payload:{},
            callback:function(res){
               console.log("res is ",res);
            }
        })
    }
    render(){
        const {articleList}=this.props;
        console.log("article skdfls is ",articleList);
       return <div className={Styles.wrapper}>
          <div className={Styles.innerWrapper}>
              {
                  articleList.map(item=><AppCard key={item.fid} title={item.title} labelList={[]} appDes={item.fbody}></AppCard>)
              }
          </div>
       </div>
    }
}
export default connect((state,initProps)=>{
   return {
       articleList:state.Main.articleList,
   }
})(MainPage);