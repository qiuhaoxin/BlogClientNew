import React,{createRef} from 'react';
import {Editor,EditorState,ContentState,Modifier,RichUtils,AtomicBlockUtils,convertToRaw, 
    CharacterMetadata,getDefaultKeyBinding,
    convertFromRaw,
    CompositeDecorator} from 'draft-js';
import Styles from './index.less';
import BlockStyleCtls from './BlockStyleCtls';
import 'draft-js/dist/Draft.css';
import LabelAndAction from '../LabelAndAction';
import {loadScriptDynamic} from '../../utils';

const decorator=new CompositeDecorator([
    {
        strategy:findEntitiesLink,
        component:Link,
    },
    // {
    //     strategy:findEntitiesCodePen,
    //     component:CodePen,
    // }
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
function findEntitiesCodePen(contentBlock,callback,contentState){
    contentBlock.findEntityRanges(
        character=>{
            const entityKey=character.getEntity();
            if(entityKey){
                const res=contentState.getEntity(entityKey).getType();
            }
            return (entityKey!==null && contentState.getEntity(entityKey).getType==='codePen');
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
function CodePenDIV({codePenInfo}){
    const {codeFragment,srcInfo}=codePenInfo;
     loadScriptDynamic(srcInfo);
    //  return <div dangerouslySetInnerHTML={{__html:codeFragment}}>
        
    //  </div>
    return <p className="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="qiuhaoxin" 
    data-slug-hash="VwPQwgJ" 
    
    data-pen-title="position">

    </p>
}
function getCustomStyleFn(styleSet,block){
     let output={};
     styleSet.forEach(style=>{
         if(style.indexOf('FONTSIZE') > -1){
            const inlineStyle=style.split('-')[1];
            output.fontSize=inlineStyle + 'px';
         }
         if(style.indexOf('LINEHEIGHT') > -1){ // LINEHEIGHT
            const lineHeight=style.split('-')[1];
            output.lineHeight=lineHeight;
         }
         if(style.indexOf('LETTERSPACE') > -1){
            const letterSpace=style.split('-')[1];
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
        let classNameResult='';
        if(classNameArr && classNameArr.length > 0){
            classNameResult=classNameArr.map(className=>{
                return `${Styles[className]}`
            })
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
    const {src,codePenInfo} = entity.getData();
    const type = entity.getType();
    let media;
    if (type === 'audio') {
    //   media = <Audio src={src} />;
    } else if (type === 'image') {
      media = <Image src={src} />;
    } else if (type === 'video') {
    //   media = <Video src={src} />;
    }
    else if(type==='codePen'){
        media=<CodePenDIV codePenInfo={codePenInfo}/>;
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
        this.defineKeyBindingFn=this._keyBindingFn.bind(this);
        this.handleKeyCommand=this._handleKeyCommand.bind(this);
        this.handleOtherStyles=this.handleOtherStyles.bind(this);
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {initContent}=nextProps;
        // if(!initContent){
        //     this.setState({
        //         editorState:EditorState.createEmpty(decorator)
        //     })
        // }
        if(initContent && initContent!=this.props.initContent){
            this.setState({
                editorState:EditorState.createWithContent(initContent,decorator)
            })
        }
    }
    _toggleBlockTypeBtn(blockType){
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
    _keyBindingFn(e){
        // e.preventDefault();
        return getDefaultKeyBinding(e);
    }
    getJsonFromEditor(){
        const {editorState}=this.state;
        if(editorState){
            return convertToRaw(editorState.getCurrentContent());
        }
    }
    render(){
        const {editorState}=this.state;
        const {readOnly,controllerVisible,labelList=[],onActionClick,mode}=this.props;
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
        //   if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        //     className += ' RichEditor-hidePlaceholder';
        //   }
        }
        return <div className={Styles.wrapper}>
            <BlockStyleCtls visible={mode==0 ? false : true} editorState={editorState} 
                onToggle={this.toggleBlockTypeBtn} 
                onToggleInlineType={this.toggleInlineTypeBtn} 
                onToggleOtherStyle={this.handleOtherStyles} />
            <div style={{display:mode!=0 ? 'none' : 'block'}}>
                 <LabelAndAction onActionClick={onActionClick} iconArr={[{key:1,iconClass:'icon-editor',iconType:'editor'}]} 
                 labelList={labelList}></LabelAndAction>
            </div>
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
                    readOnly={readOnly}
                >
                </Editor>
            </div>
        </div>
    }
}
export default BlogEditor;