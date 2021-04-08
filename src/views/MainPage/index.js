
import React from 'react';
import Styles from './index.less';

import AppCard from '../../components/AppCard';
import {connect} from 'react-redux';
import Actions from '../../actions';
import {convertFromRaw} from 'draft-js';
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
                  articleList.map(item=>{
                    const contentState=convertFromRaw(JSON.parse(item.fbody));
                    const blockMap=contentState.getBlockMap();
                    let appDes="";
                    const firstBlock=contentState.getFirstBlock();
                    if(firstBlock){
                        appDes=firstBlock.getText();
                    }
                    const cardProps={
                        title:item.title,
                        userName:item.userName,
                        timeStamp:item.fcreatetime,//item.fcreatetime,
                        imgSrc:item.fimg ? `http://localhost:5001/img/${item.fimg}` : null,
                        appDes,
                        articleId:item.fid,
                        labelList:item.flabels ? item.flabels.split(',') : []
                    }
                    return <AppCard key={item.fid} {...cardProps}></AppCard>
                  })
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