
import React from 'react';
import Styles from './index.less';

import AppCard from '../../components/AppCard';
import {connect} from 'react-redux';
import Actions from '../../actions';
import {convertFromRaw} from 'draft-js';
import Pagination from '../../components/Pagination';
// import message from '../../components/message';
class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.fetchArticles=this._fetchArticles.bind(this);
        this.handlePaginationChange=this._handlePaginationChange.bind(this);
        this.handleAction=this._handleActionClick.bind(this);
    }
    componentDidMount(){
        const {pagination}=this.props;
        this.fetchArticles(pagination);
    }
    _fetchArticles(pagination=this.props.pagination){
        const {dispatch}=this.props;
        dispatch({
            type:Actions.GET_ARTICLE_LIST,
            payload:{pagination},
            callback:function(res){
               const {errcode}=res;
               if(errcode==1){
                //    message.success("成功!",200);
               }
            }
        })
    }
    _handleDelArticle(articleId){
        const {dispatch}=this.props;
        const _this=this;
        dispatch({
            type:Actions.DEL_ARTICLE,
            payload:{
                fid:articleId,
            },
            callback:function(res){
               const {errcode}=res;
               if(errcode==1){
                  _this.fetchArticles();
               }
            }
        })
    }
    _handleActionClick(iconType,articleId){
       const {history}=this.props; 
       switch(iconType){
           case 'del':
             this._handleDelArticle(articleId);
           break;
           case 'editor':
              history.push({
                  pathname:'/publish',
                  state:{articleId}
              });
           break;
       }
    }
    _handlePaginationChange(pageIdx){
        const {pagination}=this.props;
        let newPagination={
            ...pagination,
            current:pageIdx,
        };
        this.fetchArticles(newPagination);
    }
    render(){
        const {articleList,pagination}=this.props;
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
                    return <AppCard onActionClick={this.handleAction} key={item.fid} {...cardProps}></AppCard>
                  })
              }
          </div>
          <Pagination onPaginationChange={this.handlePaginationChange} {...pagination}/>
       </div>
    }
}
export default connect((state,initProps)=>{
   return {
       articleList:state.Main.articleList,
       pagination:state.Main.pagination,
   }
})(MainPage);