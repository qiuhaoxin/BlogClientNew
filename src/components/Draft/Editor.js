import React,{createRef} from 'react';
import {Editor,EditorState,ContentState,Modifier,RichUtils,AtomicBlockUtils,convertToRaw, CharacterMetadata,} from 'draft-js';
import Styles from './index.less';
import BlockStyleCtls from './BlockStyleCtls';
import InlineStyleCtls from './InlineStyleCtls';
import 'draft-js/dist/Draft.css';
import Upload from './Upload';

import {convertToHTML} from 'draft-convert';

function getCustomStyleFn(styleSet,block){
     let output={};
     styleSet.forEach(style=>{
         const inlineStyle=style.split('-')[1];
         output.fontSize=inlineStyle + 'px';
     })
     return output;
}
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
        console.log("inlineStyle is ",inlineStyle);
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
    _handleKeyCommand(command){
        console.log("command is ",command);
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
    changeCharacterMeta(characterMetaData,style){
        return characterMetaData.toJS().style.reduce((characterMetaData,characterStyle)=>{
            if(characterStyle.indexOf(prefix)===0 && characterStyle!=style){
                CharacterMetadata.removeStyle(characterMetaData,characterStyle);
            }else{
                return characterMetaData
            }
        },characterMetaData);
    }
    handleOtherStyles=(prefix="",style)=>{
        console.log("prefix is ",prefix+" and style is ",style);
       const _this=this;
       let nextEditorState=this.state.editorState;
       style=prefix + style.toUpperCase();
       const {editorState}=this.state;
       const contentState=editorState.getCurrentContent();
       const selectionState=editorState.getSelection();
       const startKey=selectionState.getStartKey();
       const startOffset=selectionState.getStartOffset();
       const endKey=selectionState.getEndKey();
       const endOffset=selectionState.getEndOffset();
       const blockMap=contentState.getBlockMap();

       const nextContentBlocks=blockMap.map(block=>{
           let nextCharacterList=null;
           const blockKey=block.getKey();
           const characterList=block.getCharacterList();
           if(startKey==blockKey && startKey==endKey){
               nextCharacterList=characterList.map((characterMetaData,index)=>{
                   if(index>=startOffset && index<=endOffset){
                        return _this.changeCharacterMeta(characterMetaData,style);
                   }
                   return characterMetaData;
               })
           }else if(startKey==blockKey){
               nextCharacterList=characterList.map((characterMetaData,index)=>{
                    if(index >=startOffset){
                        return _this.changeCharacterMeta(characterMetaData,style);
                }
                return characterMetaData;
               })

           }else if(blockKey==endKey){
               nextCharacterList=characterList.map((characterMetaData,index)=>{
                if(index < endOffset){
                    return _this.changeCharacterMeta(characterMetaData,style);
                  }
                  return characterMetaData;
               })

           }else{
            nextCharacterList=characterList.map((characterMetaData,index)=>{
                return _this.changeCharacterMeta(characterMetaData,style);
             })
           }
           return block.merge({
               "characterList":nextCharacterList,
           })
       })
       const newContentState=contentState.merge({
           blockMap:nextContentBlocks,
           selectionBefore:selectionState,
           selectionAfter:selectionState,
       })
       console.log("newCotnentstate is ",newContentState);
       nextEditorState=EditorState.push(editorState,newContentState,"update-selection-character-list");//change-inline-style update-selection-character-list
       nextEditorState=RichUtils.toggleInlineStyle(nextEditorState,style);
    //    this.onChange(nextEditorState);
       this.setState({
           editorState:nextEditorState,
       })
       
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
            <BlockStyleCtls editorState={editorState} onToggle={this.toggleBlockTypeBtn} onToggleOtherStyle={this.handleOtherStyles}/>
            <InlineStyleCtls editorState={editorState} onToggle={this.toggleInlineTypeBtn}></InlineStyleCtls>
            <Upload onCallback={this.handleUploadCB}></Upload>
            <div className={className.split(' ').map(item=>Styles[`${item}`])} onClick={this.focus}>
                <Editor
                    customStyleFn={getCustomStyleFn}
                    blockRendererFn={this.renderBlockFn}
                    customStyleMap={styleMap}
                    blockStyleFn={getBlockStyle}
                    style={{height:'400px'}} 
                    editorState={editorState} 
                    onChange={this.onChange} 
                    ref={this.editor} 
                    spellCheck={true}>
                    handleKeyCommand={this._handleKeyCommand}
                </Editor>
            </div>
        </div>
    }
}
export default BlogEditor;