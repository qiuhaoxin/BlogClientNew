import React,{createRef} from 'react';
import {Editor,EditorState,ContentState,Modifier,RichUtils,AtomicBlockUtils,convertToRaw,} from 'draft-js';
import Styles from './index.less';
import BlockStyleCtls from './BlockStyleCtls';
import InlineStyleCtls from './InlineStyleCtls';
import 'draft-js/dist/Draft.css';
import Upload from './Upload';
import {convertToHTML} from 'draft-convert';

      // Custom overrides for "code" style.
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
class BlogEditor extends React.Component{
    constructor(props){
        super(props);
        this.editor=createRef();
        this.state={
            editorState:EditorState.createEmpty(),
        }
        this.onChange=(editorState)=>this.setState({editorState});
        this.toggleBlockTypeBtn=this._toggleBlockTypeBtn.bind(this);
        this.toggleInlineTypeBtn=this._toggleInlineTypeBtn.bind(this);
        this.renderBlockFn=this._renderBlockFn.bind(this);
        this.handleUploadCB=this._handleUploadCB.bind(this);
    }
    _toggleBlockTypeBtn(blockType){
        console.log("blockType is ",blockType);
        this.onChange(RichUtils.toggleBlockType(
            this.state.editorState,
            blockType,
        ));
    }
    _toggleInlineTypeBtn(inlineStyle){
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            inlineStyle,
        ))
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
    focus=()=>{
        this.editor.current.focus();
    }
    getHTMLFromRaw(){
        const {editorState}=this.state;
        const result=convertToRaw(editorState.getCurrentContent());
        console.log("get html from raw result is ",result);
        return result;
    }
    _handleUploadCB(info){
        const {code,imgPath}=info;
        if(code==0){
           const {editorState}=this.state;
           const contentState=editorState.getCurrentContent();
           const contentStateWithEntity=contentState.createEntity(
               'image',
               'IMMUTABLE',
               {src:imgPath}
           )
           const entityKey=contentStateWithEntity.getLastCreatedEntityKey();
           const newEditorState=EditorState.set(
               editorState,
               {currentContent:contentStateWithEntity}
           );
           this.setState({
               editorState:AtomicBlockUtils.insertAtomicBlock(
                   newEditorState,
                   entityKey,
                   ' ',//这里是空格而非空字符串
               )
           },()=>{
               setTimeout(()=>this.focus,0)
           })
        }else{

        }
    }
    render(){
        const {editorState}=this.state;
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
      
        if (!contentState.hasText()) {
        //   if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        //     className += ' RichEditor-hidePlaceholder';
        //   }
        }
        return <div className={Styles.wrapper}>
            <BlockStyleCtls editorState={editorState} onToggle={this.toggleBlockTypeBtn}/>
            <InlineStyleCtls editorState={editorState} onToggle={this.toggleInlineTypeBtn}></InlineStyleCtls>
            <Upload onCallback={this.handleUploadCB}></Upload>
            <div className={className.split(' ').map(item=>Styles[`${item}`])} onClick={this.focus}>
                <Editor
                    blockRendererFn={this.renderBlockFn}
                    customStyleMap={styleMap}
                    blockStyleFn={getBlockStyle}
                    style={{height:'400px'}} 
                    editorState={editorState} 
                    onChange={this.onChange} 
                    ref={this.editor} 
                    spellCheck={true}>
                </Editor>
            </div>
        </div>
    }
}
export default BlogEditor;