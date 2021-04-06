import React,{createRef} from 'react';
import {Editor,EditorState,ContentState,Modifier,RichUtils,AtomicBlockUtils,convertToRaw, 
    CharacterMetadata,getDefaultKeyBinding,
    CompositeDecorator} from 'draft-js';
import Styles from './index.less';
import BlockStyleCtls from './BlockStyleCtls';
import 'draft-js/dist/Draft.css';
import Upload from './Upload';


const decorator=new CompositeDecorator([
    {
        strategy:findEntitiesLink,
        component:Link,
    }
])
function findEntitiesLink(contentBlock,callback,contentState){
    //findEntityRanges
    contentBlock.findEntityRanges(
        (character)=>{
        const entityKey=character.getEntity();
        if(entityKey){
            const res=contentState.getEntity(entityKey).getType();
        }
        return (entityKey!==null && contentState.getEntity(entityKey).getType()==='LINK')
        },
        callback
    )

}
function Link(props){
    const {href}=props.contentState.getEntity(props.entityKey).getData();
    return <a href={href} style={{color: '#1890ff',textDecoration: 'underline'}}>
        {
            props.children
        }
    </a>
}
function getCustomStyleFn(styleSet,block){
    //  console.log("styleSet is ",styleSet);
     let output={};
     styleSet.forEach(style=>{
        //  console.log("style is ",style);
         if(style.indexOf('FONTSIZE') > -1){
            const inlineStyle=style.split('-')[1];
            output.fontSize=inlineStyle + 'px';
         }
         if(style.indexOf('LINEHEIGHT') > -1){ // LINEHEIGHT
            const lineHeight=style.split('-')[1];
            // console.log("line height is ",lineHeight);
            output.lineHeight=lineHeight;
         }
         if(style.indexOf('LETTERSPACE') > -1){
            const letterSpace=style.split('-')[1];
            // console.log("line height is ",letterSpace);
            output['letterSpacing']=`${letterSpace}px`;
         }
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
        const blockData=block.getData();
        let textIndent=null;
        let classNameStr="";
        if(blockData){
            textIndent=blockData.get('textIndent');
        }
        if(textIndent){
            classNameStr+=`jdtd-${textIndent} `;
        }
        switch (block.getType()) {
          case 'blockquote': 
              classNameStr+="RichEditor-blockquote ";
            break;//return Styles['RichEditor-blockquote'];
          case 'code-block': 
          classNameStr+="public-DraftStyleDefault-pre ";
          break;
          //return Styles['public-DraftStyleDefault-pre']
          default:break;;
        }

        const classNameArr=classNameStr.split(' ');
        console.log("clasName arr i s",classNameArr);
        let classNameResult='';
        if(classNameArr && classNameArr.length > 0){
            classNameResult=classNameArr.map(className=>{
                return `${Styles[className]}`
            })
            console.log("classNameResult is ",classNameResult);
            return classNameResult.join(' ');
        }
        return null;


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
            editorState:EditorState.createEmpty(decorator),
        }
        this.onChange=(editorState,callback)=>this.setState({editorState},()=>{callback && callback()});
        this.toggleBlockTypeBtn=this._toggleBlockTypeBtn.bind(this);
        this.toggleInlineTypeBtn=this._toggleInlineTypeBtn.bind(this);
        this.renderBlockFn=this._renderBlockFn.bind(this);
        this.handleUploadCB=this._handleUploadCB.bind(this);
        this.defineKeyBindingFn=this._keyBindingFn.bind(this);
        this.handleKeyCommand=this._handleKeyCommand.bind(this);
        this.handleOtherStyles=this.handleOtherStyles.bind(this);
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
    _handleKeyCommand(command,editorState){
        var newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return true;
        }
        return false;
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
    handleOtherStyles(nextEditorState,callback){
       this.onChange(nextEditorState,callback);
    }
    handleOtherStyles1=(prefix="",style)=>{
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
    _keyBindingFn(e){
        // e.preventDefault();
        return getDefaultKeyBinding(e);
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
            <BlockStyleCtls editorState={editorState} 
                onToggle={this.toggleBlockTypeBtn} 
                onToggleInlineType={this.toggleInlineTypeBtn} 
                onToggleOtherStyle={this.handleOtherStyles}/>
            {/* <Upload onCallback={this.handleUploadCB}></Upload> */}
            <div style={{height:30}}></div>
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
                    handleKeyCommand={this.handleKeyCommand}
                    keyBindingFn={this.defineKeyBindingFn}
                >
                </Editor>
            </div>
        </div>
    }
}
export default BlogEditor;