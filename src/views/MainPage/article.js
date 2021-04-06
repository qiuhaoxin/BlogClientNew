import React from 'react';
import {connect} from 'react-redux';
import Actions from '../../actions';
import {Editor,EditorState,RichUtils,convertFromHTML,ContentState,convertFromRaw} from 'draft-js';
import Styles from './article.less';
import 'draft-js/dist/Draft.css';
import BlogEditor from '../../components/Draft/Editor';

const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };
function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return Styles['RichEditor-blockquote'];
      case 'code-block': return Styles['public-DraftStyleDefault-pre']
      default: return null;
    }
  }
  function Image({src}){
    return <img src={src}/>
}
const Media = (props) => {
    const entity = props.contentState.getEntity(
      props.block.getEntityAt(0)
    );
    const {src} = entity.getData();
    const type = entity.getType();
    let media;
    if (type === 'audio') {
    //   media = <Audio src={src} />;
    } else if (type === 'image') {
      media = <Image src={src} />;
    } else if (type === 'video') {
    //   media = <Video src={src} />;
    }

    return media;
  };
class Article extends React.Component{
     constructor(props){
         super(props);
         this.editor=React.createRef();
         this.state={
             editorState:EditorState.createEmpty(),
         }
         this.fetchArticle=this._fetchArticle.bind(this);
         this.renderBlockFn=this._renderBlockFn.bind(this);
     }
     _renderBlockFn(block){
        const type=block.getType();
        if(type=='atomic'){
          return {
              component:Media,
              editable:false,
          }
        }
        return null;
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
       console.log("ftetsdflsdjflsdkjflsdfjls");
         const {dispatch}=this.props;
         const {articleId}=this.props.match.params;
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
                    //   const blocksFromHTML=convertFromHTML(fbody);
                      const afterConvert=convertFromRaw(JSON.parse(fbody));
                      _this.setState({
                          editorState:EditorState.createWithContent(afterConvert)
                      })
                  }
             }
         })
     }
     render(){
         const {editorState}=this.state;
         const {articleData}=this.props;
         console.log("fbody is ",articleData);
         return <div className={Styles.wrapper}>
             <div className={Styles.title}>{articleData.ftitle}</div>
            <div className={Styles.innerWrapper}>
                <BlogEditor initContent={articleData && articleData.fbody ? convertFromRaw(JSON.parse(articleData.fbody)) : null}/>
                {/* <Editor                     
                    blockRendererFn={this.renderBlockFn}
                    customStyleMap={styleMap}
                    blockStyleFn={getBlockStyle} 
                    readOnly={true} 
                    editorState={editorState} 
                    ref={this.editor} 
                    onChange={this.handleEditorChange}></Editor> */}
            </div>
         </div>
     }
}

export default connect((state,initProps)=>{
    return {
        articleData:state.Main.article,
    }
})(Article);