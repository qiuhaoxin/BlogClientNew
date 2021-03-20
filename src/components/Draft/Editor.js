import React,{createRef} from 'react';
import {Editor,EditorState,ContentState,Modifier,RichUtils} from 'draft-js';
import Styles from './index.less';
import BlockStyleCtls from './BlockStyleCtls';
import InlineStyleCtls from './InlineStyleCtls';
import 'draft-js/dist/Draft.css';

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
          console.log("getBlockStyle is ",block.getType());
        switch (block.getType()) {
          case 'blockquote': return Styles['RichEditor-blockquote'];
          case 'code-block': return Styles['public-DraftStyleDefault-pre']
          default: return null;
        }
      }
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
    focus=()=>{
        this.editor.current.focus();
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
        console.log("className is ",className.split(' '));
        return <div className={Styles.wrapper}>
            <BlockStyleCtls editorState={editorState} onToggle={this.toggleBlockTypeBtn}/>
            <InlineStyleCtls editorState={editorState} onToggle={this.toggleInlineTypeBtn}></InlineStyleCtls>
            <div className={className.split(' ').map(item=>Styles[`${item}`])} onClick={this.focus}>
                <Editor
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