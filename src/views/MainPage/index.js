
import React from 'react';
import Styles from './index.less';

import AppCard from '../../components/AppCard';
import {connect} from 'react-redux';
import Actions from '../../actions';
const labelList=[
    {key:'webpack',name:'webpack'},
    {key:'gch',name:'工程化'}
];
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
       return <div className={Styles.wrapper}>
          <div className={Styles.innerWrapper}>
              {
                  articleList.map(item=><AppCard key={item.fid} title={item.title} 
                    userName={item.userName} labelList={[]} appDes={item.fbody} articleId={item.fid}
                    timeStamp={item.ftimestamp}></AppCard>)
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