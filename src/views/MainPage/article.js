import React from 'react';
import {connect} from 'react-redux';
import Actions from '../../actions';
import {Editor,EditorState,RichUtils,convertFromHTML,ContentState} from 'draft-js';
import Styles from './article.less';
import 'draft-js/dist/Draft.css';
class Article extends React.Component{
     constructor(props){
         super(props);
         this.editor=React.createRef();
         this.state={
             editorState:EditorState.createEmpty(),
         }
         this.fetchArticle=this._fetchArticle.bind(this);
     }
     componentDidMount(){
         this.fetchArticle();
     }
     focus=()=>{
         if(this.editor){
             this.editor.current.blur();
         }
     }
     handleEditorChange=()=>{

     }
     _fetchArticle(){
         const {dispatch}=this.props;
         const {articleId}=this.props.match.params;
         console.log("articleId is ",articleId);
         const _this=this;
         dispatch({
             type:Actions.GET_ARTICLE,
             payload:{
                articleId
             },
             callback(res){
                  const {errcode,data}=res;
                  if(errcode==1){
                      const article=data[0];
                      const {ftitle,fbody}=article;
                      const blocksFromHTML=convertFromHTML(fbody);
                      const state = ContentState.createFromBlockArray(
                        blocksFromHTML.contentBlocks,
                        blocksFromHTML.entityMap,
                      );
                      _this.setState({
                          editorState:EditorState.createWithContent(
                              state
                          )
                      })

                  }
             }
         })
     }
     render(){
         const {editorState}=this.state;
         return <div className={Styles.wrapper}>
             <Editor readOnly={true} editorState={editorState} ref={this.editor} onChange={this.handleEditorChange}></Editor>
         </div>
     }
}

export default connect((state,initProps)=>{
    return {

    }
})(Article);